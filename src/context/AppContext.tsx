/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { 
  User, Product, Order, Worker, ProductionIntake, 
  InventoryMovement, GeneralExpense, AppContextType 
} from '../types';
import { supabase } from '../lib/supabase';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current logged-in user
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const data = localStorage.getItem("kidzy_user");
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error("Error parsing user from storage", e);
      }
    }
    return null;
  });

  // Products state (models/items)
  const [products, setProducts] = useState<Product[]>(() => {
    const local = localStorage.getItem("kidzy_products_v2");
    if (!local) return [];
    try {
      return JSON.parse(local);
    } catch {
      return [];
    }
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    const local = localStorage.getItem("kidzy_orders");
    if (!local) return [];
    try {
      return JSON.parse(local);
    } catch {
      return [];
    }
  });

  // Transactions state
  const [transactions, setTransactions] = useState<any[]>(() => {
    const local = localStorage.getItem("kidzy_transactions");
    return local ? JSON.parse(local) : [];
  });

  // Users (Staff) state
  const [users, setUsers] = useState<User[]>(() => {
    const local = localStorage.getItem("kidzy_users");
    if (!local) return [];
    try {
      return JSON.parse(local);
    } catch {
      return [];
    }
  });

  // Workshop Workers / Tailors state
  const [workers, setWorkers] = useState<Worker[]>(() => {
    const local = localStorage.getItem("kidzy_workers");
    if (!local) return [];
    try {
      const parsed = JSON.parse(local);
      return parsed.map((item: any) => ({
        ...item,
        payments: item.payments || []
      }));
    } catch (e) {
      console.error("Error parsing workers", e);
      return [];
    }
  });

  // Production Intakes state
  const [productionIntakes, setProductionIntakes] = useState<ProductionIntake[]>(() => {
    const local = localStorage.getItem("kidzy_intakes");
    return local ? JSON.parse(local) : [];
  });

  // Inventory Movements state
  const [inventoryMovements, setInventoryMovements] = useState<InventoryMovement[]>(() => {
    const local = localStorage.getItem("kidzy_movements");
    return local ? JSON.parse(local) : [];
  });

  // General Expenses state
  const [generalExpenses, setGeneralExpenses] = useState<GeneralExpense[]>(() => {
    const local = localStorage.getItem("kidzy_expenses");
    return local ? JSON.parse(local) : [];
  });

  // Handle urgent deadline date expirations automatically on start
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setOrders(prevOrders => {
      let changed = false;
      const updated = prevOrders.map(o => {
        if ((o.isUrgent || o.deliveryDuration === "urgent") && o.status !== "delivered") {
          const deadline = new Date(o.deadlineDate);
          deadline.setHours(0, 0, 0, 0);
          if (deadline.getTime() < today.getTime()) {
            changed = true;
            return {
              ...o,
              isUrgent: false,
              deliveryDuration: "normal" as const,
              lastUpdateDate: new Date().toISOString()
            };
          }
        }
        return o;
      });
      return changed ? updated : prevOrders;
    });
  }, []);

  const syncInProgress = useRef(true);
  const syncErrors = useRef<Record<string, string>>({});
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
  const [syncMessage, setSyncMessage] = useState<string>('');

  // 1. Initial Load from Database via Supabase on mount
  useEffect(() => {
    const loadDataFromDatabase = async () => {
      console.log("⚡ Initiating database sync via Supabase client...");
      syncInProgress.current = true;
      setSyncStatus('syncing');
      setSyncMessage('جاري الاتصال بـ Supabase وشحن الجداول...');
      try {
        const tables = [
          "products", "orders", "transactions", "users", 
          "workers", "production_intakes", "inventory_movements", "general_expenses"
        ];

        const fetchTable = async (tableName: string) => {
          const { data, error } = await supabase.from(tableName).select("*");
          if (error) {
            throw new Error(error.message || `Failed to load table ${tableName}`);
          }
          return data || [];
        };

        const results = await Promise.allSettled(tables.map(t => fetchTable(t)));

        const errors: string[] = [];
        results.forEach((result, idx) => {
          const tableName = tables[idx];

          if (result.status === "fulfilled" && result.value !== undefined) {
            const data = result.value || [];
            console.log(`✅ Loaded ${data.length} records for table [${tableName}] from Supabase.`);
            if (tableName === "products") {
              setProducts(data);
            } else if (tableName === "orders") {
              setOrders(data);
            } else if (tableName === "transactions") {
              setTransactions(data);
            } else if (tableName === "users") {
              const normalizedUsers = data.map((u: any) => ({
                ...u,
                staffRoles: u.staffRoles || [],
                variableTasks: u.variableTasks || [],
                permissions: u.permissions || []
              }));
              setUsers(normalizedUsers);
            } else if (tableName === "workers") {
              const normalizedWorkers = data.map((w: any) => ({
                ...w,
                payments: w.payments || []
              }));
              setWorkers(normalizedWorkers);
            } else if (tableName === "production_intakes") {
              setProductionIntakes(data);
            } else if (tableName === "inventory_movements") {
              setInventoryMovements(data);
            } else if (tableName === "general_expenses") {
              setGeneralExpenses(data);
            }
          } else {
            const errMsg = result.status === "rejected" ? (result.reason?.message || result.reason || "") : "";
            console.warn(`⚠️ Table [${tableName}] could not load from Supabase. Fallback is active.`, errMsg);
            errors.push(`${tableName} (${errMsg})`);
          }
        });

        if (errors.length > 0) {
          setSyncStatus('error');
          setSyncMessage(`فشل شحن بعض الجداول: ${errors.join(', ')}`);
        } else {
          setSyncStatus('synced');
          setSyncMessage('متصل بـ Supabase وجميع الجداول متزامنة بنجاح!');
        }
      } catch (err: any) {
        console.error("Error loading database sync from Supabase:", err);
        setSyncStatus('error');
        setSyncMessage(`فشل الاتصال بـ Supabase: ${err.message || err}`);
      } finally {
        syncInProgress.current = false;
      }
    };

    loadDataFromDatabase();
  }, []);

  // 2. Sync to LocalStorage on state actions (resilient backup)
  useEffect(() => {
    localStorage.setItem("kidzy_products_v2", JSON.stringify(products));
    localStorage.setItem("kidzy_orders", JSON.stringify(orders));
    localStorage.setItem("kidzy_transactions", JSON.stringify(transactions));
    localStorage.setItem("kidzy_users", JSON.stringify(users));
    localStorage.setItem("kidzy_workers", JSON.stringify(workers));
    localStorage.setItem("kidzy_intakes", JSON.stringify(productionIntakes));
    localStorage.setItem("kidzy_movements", JSON.stringify(inventoryMovements));
    localStorage.setItem("kidzy_expenses", JSON.stringify(generalExpenses));
    if (currentUser) {
      localStorage.setItem("kidzy_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("kidzy_user");
    }
  }, [
    products, orders, transactions, users, workers, 
    productionIntakes, inventoryMovements, generalExpenses, currentUser
  ]);

  // 3. Debounced synchronization of state changes back to Supabase via proxy
  useEffect(() => {
    if (syncInProgress.current) return;

    const syncTable = async (tableName: string, dataList: any[]) => {
      try {
        console.log(`🔄 Starting sync for table [${tableName}] with ${dataList?.length || 0} items`);
        setSyncStatus('syncing');
        setSyncMessage(`جاري مزامنة التغييرات لجدول [${tableName}]...`);

        // Use Supabase directly instead of proxy server
        const { error: upsertError } = await supabase.from(tableName).upsert(dataList || [], { onConflict: "id" });

        if (upsertError) {
          console.error(`❌ Sync failed for [${tableName}]:`, upsertError);
          throw new Error(upsertError.message || `Failed to sync table ${tableName}`);
        }

        // Sync deletions: remove from Supabase if not in local list
        const { data: dbIds, error: selectError } = await supabase.from(tableName).select("id");
        if (!selectError && dbIds) {
          const localIdSet = new Set(dataList.map(item => String(item.id)));
          const extraIds = dbIds.map((item: any) => String(item.id)).filter(id => !localIdSet.has(id));
          if (extraIds.length > 0) {
            console.log(`🗑️ Deleting extra items from table ${tableName}:`, extraIds);
            await supabase.from(tableName).delete().in("id", extraIds);
          }
        }

        console.log(`✅ Synced ${dataList.length} items to table [${tableName}] in Database.`);
        delete syncErrors.current[tableName];

        const activeErrorsCount = Object.keys(syncErrors.current).length;
        if (activeErrorsCount > 0) {
          setSyncStatus('error');
          setSyncMessage(`فشل مزامنة بعض الجداول لقاعدة البيانات: ${Object.entries(syncErrors.current).map(([tbl, err]) => `[${tbl}] (${err})`).join(', ')}`);
        } else {
          setSyncStatus('synced');
          setSyncMessage('تم حفظ وتحديث جميع البيانات المتغيرة بنجاح في Supabase ✨');
        }
      } catch (err: any) {
        console.error(`❌ Sync request crashed for [${tableName}]:`, err.message || err, err);
        syncErrors.current[tableName] = err.message || "Network Error";
        setSyncStatus('error');
        setSyncMessage(`فشل اتصال الشبكة بمزامنة جدول [${tableName}]: ${err.message || err}`);
      }
    };

    const debounceTimer = setTimeout(() => {
      syncTable("products", products);
      syncTable("orders", orders);
      syncTable("transactions", transactions);
      syncTable("users", users);
      syncTable("workers", workers);
      syncTable("production_intakes", productionIntakes);
      syncTable("inventory_movements", inventoryMovements);
      syncTable("general_expenses", generalExpenses);
    }, 1500);

    return () => clearTimeout(debounceTimer);
  }, [
    products, orders, transactions, users, workers, 
    productionIntakes, inventoryMovements, generalExpenses
  ]);

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("kidzy_user");
  };

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      products, setProducts,
      orders, setOrders,
      transactions, setTransactions,
      users, setUsers,
      workers, setWorkers,
      productionIntakes, setProductionIntakes,
      inventoryMovements, setInventoryMovements,
      generalExpenses, setGeneralExpenses,
      logout,
      syncStatus,
      syncMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};



