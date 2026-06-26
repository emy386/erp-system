function Zue() {
  const {
      workers: e,
      setWorkers: t,
      products: n,
      setProducts: r,
      productionIntakes: a,
      setProductionIntakes: s,
      inventoryMovements: o,
      setInventoryMovements: u,
    } = _a(),
    [f, h] = j.useState("production"),
    [g, m] = j.useState(() => {
      const I = localStorage.getItem("kidzy_production_statuses");
      return I ? JSON.parse(I) : {};
    }),
    [v, b] = j.useState("all"),
    [w, N] = j.useState(""),
    [S, k] = j.useState("all"),
    [E, A] = j.useState(""),
    [T, P] = j.useState(""),
    [C, D] = j.useState(""),
    [O, L] = j.useState("all"),
    [z, K] = j.useState(""),
    [q, te] = j.useState(""),
    [xe, ie] = j.useState(""),
    [B, se] = j.useState("all"),
    [ue, ye] = j.useState(""),
    [ne, $] = j.useState(""),
    [Y, he] = j.useState(""),
    [oe, Z] = j.useState("all"),
    [H, je] = j.useState(""),
    [be, J] = j.useState(""),
    [me, Ie] = j.useState(""),
    [ge, M] = j.useState(null),
    [V, fe] = j.useState(0),
    [ce, Ne] = j.useState(null),
    [Fe, rt] = j.useState({
      isOpen: !1,
      title: "",
      message: "",
      onConfirm: () => {},
    }),
    [Ue, mt] = j.useState(!1),
    [qe, Ge] = j.useState(!1),
    [st, Qt] = j.useState(!1),
    [Sn, zt] = j.useState(!1),
    [X, Se] = j.useState("cutting"),
    [ke, Ae] = j.useState(""),
    [Ve, et] = j.useState(new Date().toISOString().split("T")[0]),
    [at, Ot] = j.useState([]),
    [Ce, $t] = j.useState(""),
    [Pt, yt] = j.useState(new Date().toISOString().split("T")[0]),
    [Pn, yr] = j.useState(0),
    [oa, Ht] = j.useState(0),
    [Kt, si] = j.useState({ name: "", phone: "", role: "cutting" }),
    [Gs, Ws] = j.useState(0),
    [Ys, Ea] = j.useState(""),
    [co, Xs] = j.useState(""),
    [au, Js] = j.useState(null),
    [uo, Yi] = j.useState(!1),
    [fo, ho] = j.useState(""),
    [zr, en] = j.useState(""),
    [Nn, Ta] = j.useState("cutting"),
    [rn, po] = j.useState(null),
    [kf, Zs] = j.useState(!1),
    [li, Qs] = j.useState(""),
    [wr, Ca] = j.useState(0),
    [$r, Oa] = j.useState(0),
    an = (I) => {
      (Js(I), ho(I.name), en(I.phone || ""), Ta(I.role || "cutting"), Yi(!0));
    },
    iu = (I) => {
      (I.preventDefault(),
        au &&
          (t(
            e.map((W) =>
              W.id === au.id ? { ...W, name: fo, phone: zr, role: Nn } : W,
            ),
          ),
          Yi(!1),
          Js(null)));
    },
    _f = (I) => {
      const W = e.find((Ke) => Ke.id === I);
      if (!W) return;
      const we = a.filter((Ke) => Ke.workerId === I);
      we.length > 0
        ? rt({
            isOpen: !0,
            title: "تأكيد حذف العامل والسجلات ⚠️",
            message: `هذا العامل "${W.name}" لديه ${we.length} مرحلة إنتاج مسجلة باسمه. هل أنت متأكد من حذفه نهائياً؟ سيتم أيضاً حذف جميع مراحل التشغيل الخاصة به من السجل ومن كشف الحساب وتعديل المخزون!`,
            onConfirm: () => {
              let Ke = [...n],
                Ze = [...o];
              (we.forEach((Oe) => {
                Oe.productId &&
                  Oe.variantId &&
                  ((Ke = Ke.map((Xe) =>
                    Xe.id === Oe.productId
                      ? {
                          ...Xe,
                          variants: Xe.variants.map((Je) =>
                            Je.id === Oe.variantId
                              ? {
                                  ...Je,
                                  quantity: Math.max(
                                    0,
                                    Je.quantity - Oe.quantity,
                                  ),
                                }
                              : Je,
                          ),
                        }
                      : Xe,
                  )),
                  (Ze = Ze.filter((Xe) => Xe.refId !== Oe.id)));
              }),
                r(Ke),
                u(Ze),
                s(a.filter((Oe) => Oe.workerId !== I)),
                t(e.filter((Oe) => Oe.id !== I)),
                ce === I && Ne(null));
            },
          })
        : rt({
            isOpen: !0,
            title: "حذف العامل / ورشة العمل ❌",
            message: `هل أنت متأكد من حذف العامل/الورشة "${W.name}"؟`,
            onConfirm: () => {
              (t(e.filter((Ke) => Ke.id !== I)), ce === I && Ne(null));
            },
          });
    },
    Ur = (I) => {
      (po(I), Qs(I.date), Ca(I.quantity), Oa(I.costPerItem), Zs(!0));
    },
    oi = (I) => {
      if ((I.preventDefault(), !rn)) return;
      const W = rn.quantity;
      rn.costPerItem;
      const we = wr,
        Ke = $r,
        Ze = we - W,
        Oe = we * Ke,
        Xe = a.map((Je) =>
          Je.id === rn.id
            ? { ...Je, date: li, quantity: we, costPerItem: Ke, totalCost: Oe }
            : Je,
        );
      if ((s(Xe), rn.productId && rn.variantId)) {
        const Je = n.map((Ft) =>
          Ft.id === rn.productId
            ? {
                ...Ft,
                variants: Ft.variants.map((sn) =>
                  sn.id === rn.variantId
                    ? { ...sn, quantity: Math.max(0, sn.quantity + Ze) }
                    : sn,
                ),
              }
            : Ft,
        );
        r(Je);
        const ct = o.map((Ft) =>
          Ft.refId === rn.id ? { ...Ft, quantity: we } : Ft,
        );
        u(ct);
      }
      (Zs(!1), po(null));
    },
    mo = (I) => {
      const W = a.find((we) => we.id === I);
      W &&
        rt({
          isOpen: !0,
          title: "تأكيد حذف مرحلة الإنتاج 🗑️",
          message:
            "هل أنت متأكد من حذف هذه المرحلة؟ سيتم تعديل الحسابات والمخزون تلقائياً.",
          onConfirm: () => {
            if (W.productId && W.variantId) {
              const we = n.map((Ze) =>
                Ze.id === W.productId
                  ? {
                      ...Ze,
                      variants: Ze.variants.map((Oe) =>
                        Oe.id === W.variantId
                          ? {
                              ...Oe,
                              quantity: Math.max(0, Oe.quantity - W.quantity),
                            }
                          : Oe,
                      ),
                    }
                  : Ze,
              );
              r(we);
              const Ke = o.filter((Ze) => Ze.refId !== I);
              u(Ke);
            }
            s(a.filter((we) => we.id !== I));
          },
        });
    },
    Af = (I, W) => {
      rt({
        isOpen: !0,
        title: "حذف دفعة مالية 💵",
        message:
          "هل أنت متأكد من حذف هذه الدفعة المالية؟ سيتم تحديث كشف الحساب والماليات تلقائياً.",
        onConfirm: () => {
          t(
            e.map((we) => {
              if (we.id === I) {
                const Ke = (we.payments || []).filter((Oe) => Oe.id !== W),
                  Ze = Ke.reduce((Oe, Xe) => Oe + (Xe.amount || 0), 0);
                return {
                  ...we,
                  payments: Ke,
                  totalPaid: Ze,
                  remainingBalance: we.totalOwed - Ze,
                };
              }
              return we;
            }),
          );
        },
      });
    },
    Xi = a,
    Ef = j.useMemo(() => {
      let I = a.filter((W) => W.type === "cutting");
      if (
        (O && O !== "all" && (I = I.filter((W) => W.workerId === O)),
        C.trim() !== "")
      ) {
        const W = C.toLowerCase();
        I = I.filter(
          (we) =>
            (we.productName && we.productName.toLowerCase().includes(W)) ||
            (we.workerName && we.workerName.toLowerCase().includes(W)) ||
            (we.receiptId && we.receiptId.toLowerCase().includes(W)),
        );
      }
      return (
        z && (I = I.filter((W) => W.date >= z)),
        q && (I = I.filter((W) => W.date <= q)),
        I
      );
    }, [a, C, z, q, O]),
    el = j.useMemo(() => {
      let I = a.filter((W) => W.type === "sewing" || !W.type);
      if (
        (B && B !== "all" && (I = I.filter((W) => W.workerId === B)),
        xe.trim() !== "")
      ) {
        const W = xe.toLowerCase();
        I = I.filter(
          (we) =>
            (we.productName && we.productName.toLowerCase().includes(W)) ||
            (we.workerName && we.workerName.toLowerCase().includes(W)) ||
            (we.receiptId && we.receiptId.toLowerCase().includes(W)),
        );
      }
      return (
        ue && (I = I.filter((W) => W.date >= ue)),
        ne && (I = I.filter((W) => W.date <= ne)),
        I
      );
    }, [a, xe, ue, ne, B]),
    tl = j.useMemo(() => {
      let I = a.filter((W) => W.type === "packaging");
      if (
        (oe && oe !== "all" && (I = I.filter((W) => W.workerId === oe)),
        Y.trim() !== "")
      ) {
        const W = Y.toLowerCase();
        I = I.filter(
          (we) =>
            (we.productName && we.productName.toLowerCase().includes(W)) ||
            (we.workerName && we.workerName.toLowerCase().includes(W)) ||
            (we.receiptId && we.receiptId.toLowerCase().includes(W)),
        );
      }
      return (
        H && (I = I.filter((W) => W.date >= H)),
        be && (I = I.filter((W) => W.date <= be)),
        I
      );
    }, [a, Y, H, be, oe]),
    Dn = j.useMemo(
      () =>
        e.map((I) => {
          let W = a.filter((Je) => Je.workerId === I.id),
            we = I.payments || [];
          (E &&
            ((W = W.filter((Je) => Je.date >= E)),
            (we = we.filter(
              (Je) => (Je.date ? Je.date.split("T")[0] : "") >= E,
            ))),
            T &&
              ((W = W.filter((Je) => Je.date <= T)),
              (we = we.filter(
                (Je) => (Je.date ? Je.date.split("T")[0] : "") <= T,
              ))));
          const Ke = W.reduce((Je, ct) => Je + (ct.totalCost || 0), 0),
            Ze = we.reduce((Je, ct) => Je + (ct.amount || 0), 0),
            Oe = Ke - Ze,
            Xe = W.reduce((Je, ct) => Je + (ct.quantity || 0), 0);
          return {
            ...I,
            totalOwed: Ke,
            totalPaid: Ze,
            remainingBalance: Oe,
            totalFinishedItems: Xe,
          };
        }),
      [e, a, E, T],
    ),
    Yn = j.useMemo(() => {
      let I = Dn;
      if (
        (S && S !== "all" && (I = I.filter((W) => W.id === S)), w.trim() !== "")
      ) {
        const W = w.toLowerCase();
        I = I.filter((we) => we.name.toLowerCase().includes(W));
      }
      return I;
    }, [Dn, S, w]),
    go = j.useMemo(() => {
      const I = Xi.length,
        W = Xi.filter((Oe) => Oe.type === "cutting").reduce(
          (Oe, Xe) => Oe + Xe.quantity,
          0,
        ),
        we = Xi.filter((Oe) => Oe.type === "sewing" || !Oe.type).reduce(
          (Oe, Xe) => Oe + Xe.quantity,
          0,
        ),
        Ke = Xi.filter((Oe) => Oe.type === "packaging").reduce(
          (Oe, Xe) => Oe + Xe.quantity,
          0,
        ),
        Ze = Dn.reduce(
          (Oe, Xe) => Oe + (Xe.remainingBalance > 0 ? Xe.remainingBalance : 0),
          0,
        );
      return {
        totalIntakeCount: I,
        cutPieces: W,
        sewPieces: we,
        pkgPieces: Ke,
        totalActiveOwed: Ze,
      };
    }, [Xi, Dn]),
    Br = j.useMemo(() => Dn.find((I) => I.id === ce), [Dn, ce]),
    vo = j.useMemo(
      () => (ce ? a.filter((I) => I.workerId === ce) : []),
      [a, ce],
    ),
    nl = j.useMemo(() => {
      const I = {};
      return (
        a.forEach((W) => {
          if (!W.productId || !W.variantId) return;
          const we = `${W.productId}-${W.variantId}`;
          if (!I[we]) {
            const Ze = n.find((Oe) => Oe.id === W.productId);
            I[we] = {
              variantId: W.variantId,
              productId: W.productId,
              productName:
                W.productName ||
                (Ze == null ? void 0 : Ze.name) ||
                "موديل غير معروف",
              productCode: (Ze == null ? void 0 : Ze.code) || "",
              color: W.color || "عام",
              size: W.size || "عام",
              cutQty: 0,
              cutWorkers: [],
              sewQty: 0,
              sewWorkers: [],
              pkgQty: 0,
              pkgWorkers: [],
            };
          }
          const Ke = I[we];
          W.type === "cutting"
            ? ((Ke.cutQty += W.quantity),
              W.workerName &&
                !Ke.cutWorkers.includes(W.workerName) &&
                Ke.cutWorkers.push(W.workerName))
            : W.type === "sewing" || !W.type
              ? ((Ke.sewQty += W.quantity),
                W.workerName &&
                  !Ke.sewWorkers.includes(W.workerName) &&
                  Ke.sewWorkers.push(W.workerName))
              : W.type === "packaging" &&
                ((Ke.pkgQty += W.quantity),
                W.workerName &&
                  !Ke.pkgWorkers.includes(W.workerName) &&
                  Ke.pkgWorkers.push(W.workerName));
        }),
        Object.values(I)
      );
    }, [a, n]),
    rl = (I) => {
      I.preventDefault();
      const W = {
        id: `WRK-${Date.now()}`,
        name: Kt.name || "",
        phone: Kt.phone || "",
        role: Kt.role || "cutting",
        totalFinishedItems: 0,
        totalOwed: 0,
        totalPaid: 0,
        remainingBalance: 0,
        payments: [],
      };
      (t([...e, W]), mt(!1), si({ name: "", phone: "", role: "cutting" }));
    },
    Tf = (I = "sewing") => {
      Ot([
        ...at,
        { productId: "", variantId: "", quantity: 0, costPerItem: 0, type: I },
      ]);
    },
    tr = (I) => {
      Ot(at.filter((W, we) => we !== I));
    },
    xo = (I) => {
      if ((I.preventDefault(), !ke || at.length === 0)) return;
      const W = e.find((ct) => ct.id === ke);
      if (!W) return;
      const we = `RCPT-${Date.now()}`,
        Ke = [];
      let Ze = 0,
        Oe = 0;
      const Xe = [...n],
        Je = [...o];
      (at.forEach((ct) => {
        const Ft = Xe.find((jr) => jr.id === ct.productId),
          sn =
            Ft == null
              ? void 0
              : Ft.variants.find((jr) => jr.id === ct.variantId);
        if (Ft && sn) {
          const jr = ct.quantity * ct.costPerItem;
          ((Ze += jr), (Oe += ct.quantity));
          const lu = {
            id: `INTK-${Date.now()}-${Math.random()}`,
            receiptId: we,
            workerId: W.id,
            workerName: W.name,
            date: Ve,
            productId: Ft.id,
            productName: Ft.name,
            variantId: sn.id,
            color: sn.color,
            size: sn.size,
            quantity: ct.quantity,
            costPerItem: ct.costPerItem,
            totalCost: jr,
            type: ct.type,
          };
          Ke.push(lu);
          const yo = Xe.findIndex((ci) => ci.id === Ft.id),
            Pf = Xe[yo].variants.findIndex((ci) => ci.id === sn.id);
          ((Xe[yo].variants[Pf].quantity += ct.quantity),
            Je.unshift({
              id: `MOV-${Date.now()}-${Math.random()}`,
              variantId: sn.id,
              type: "in",
              quantity: ct.quantity,
              reason: `استلام إنتاج (${ct.type === "cutting" ? "قص" : "تقفيل"}) - إيصال ${we}`,
              date: new Date().toISOString(),
              refId: lu.id,
            }));
        }
      }),
        s([...Ke, ...a]),
        r(Xe),
        u(Je),
        t(
          e.map((ct) => {
            if (ct.id === W.id) {
              const Ft = ct.totalOwed + Ze,
                sn = ct.totalFinishedItems + Oe;
              return {
                ...ct,
                totalOwed: Ft,
                totalFinishedItems: sn,
                remainingBalance: Ft - ct.totalPaid,
              };
            }
            return ct;
          }),
        ),
        Ge(!1),
        Ae(""),
        Ot([]));
    },
    su = (I) => {
      if ((I.preventDefault(), !Ce || Pn <= 0)) return;
      const W = e.find((Xe) => Xe.id === Ce);
      if (!W) return;
      const we = Pn * oa,
        Ke = `PKG-${Date.now()}`,
        Ze = {
          id: `INTK-${Date.now()}-${Math.random()}`,
          receiptId: Ke,
          workerId: W.id,
          workerName: W.name,
          date: Pt,
          productId: "",
          productName: "تغليف عام",
          variantId: "",
          color: "غير محدد",
          size: "عام",
          quantity: Pn,
          costPerItem: oa,
          totalCost: we,
          type: "packaging",
        },
        Oe = e.map((Xe) => {
          if (Xe.id === W.id) {
            const Je = (Xe.totalOwed || 0) + we,
              ct = (Xe.totalFinishedItems || 0) + Pn;
            return {
              ...Xe,
              totalOwed: Je,
              totalFinishedItems: ct,
              remainingBalance: Je - Xe.totalPaid,
            };
          }
          return Xe;
        });
      (s([Ze, ...a]), t(Oe), Ge(!1), zt(!1), $t(""), yr(0), Ht(0));
    },
    bo = (I) => {
      (I.preventDefault(),
        !(!co || Gs <= 0) &&
          (t(
            e.map((W) => {
              if (W.id === co) {
                const we = {
                    id: `PAY-${Date.now()}`,
                    workerId: W.id,
                    amount: Gs,
                    date: new Date().toISOString(),
                    note: Ys,
                  },
                  Ke = W.totalPaid + Gs;
                return {
                  ...W,
                  totalPaid: Ke,
                  remainingBalance: W.totalOwed - Ke,
                  payments: [we, ...(W.payments || [])],
                };
              }
              return W;
            }),
          ),
          Qt(!1),
          Ws(0),
          Ea("")));
    },
    Ji = (I, W) => {
      if (W <= 0) return;
      const we = a.find((Oe) => Oe.id === I);
      if (!we) return;
      const Ke = a.map((Oe) => {
        if (Oe.id === I) {
          const Xe = Oe.paidAmount || 0,
            Je = Math.min(Oe.totalCost, Xe + W);
          return { ...Oe, paidAmount: Je };
        }
        return Oe;
      });
      s(Ke);
      const Ze = e.map((Oe) => {
        if (Oe.id === we.workerId) {
          const Xe = {
              id: `PAY-${Date.now()}`,
              workerId: Oe.id,
              amount: W,
              date: new Date().toISOString(),
              note: `سداد قيمة تشغيل: ${we.productName} (${we.color}/${we.size}) - ${we.type === "cutting" ? "قص" : we.type === "packaging" ? "تغليف" : "تقفيل"}`,
            },
            Je = (Oe.totalPaid || 0) + W;
          return {
            ...Oe,
            totalPaid: Je,
            remainingBalance: (Oe.totalOwed || 0) - Je,
            payments: [Xe, ...(Oe.payments || [])],
          };
        }
        return Oe;
      });
      (t(Ze), M(null), fe(0));
    },
    Cf = (I, W) => {
      const we = { ...g, [I]: W };
      (m(we),
        localStorage.setItem("kidzy_production_statuses", JSON.stringify(we)));
    },
    Of = (I) =>
      I.remainingBalance <= 0
        ? { label: "مدفوع بالكامل", color: "text-emerald-600 bg-emerald-50" }
        : I.totalPaid === 0
          ? { label: "غير مدفوع", color: "text-red-600 bg-red-50" }
          : { label: "مدفوع جزئي", color: "text-amber-600 bg-amber-50" },
    Zi = () =>
      c.jsxs(c.Fragment, {
        children: [
          uo &&
            c.jsx("div", {
              className:
                "fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4",
              children: c.jsxs("div", {
                className:
                  "bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl text-right",
                children: [
                  c.jsxs("div", {
                    className:
                      "p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center text-right",
                    children: [
                      c.jsx("h3", {
                        className: "text-lg font-black text-slate-800",
                        children: "تعديل بيانات ورشة / عامل ✏️",
                      }),
                      c.jsx("button", {
                        onClick: () => {
                          (Yi(!1), Js(null));
                        },
                        className:
                          "text-slate-400 font-bold hover:text-slate-600 p-1",
                        children: "✕",
                      }),
                    ],
                  }),
                  c.jsxs("form", {
                    onSubmit: iu,
                    className: "p-6 space-y-4 text-right",
                    children: [
                      c.jsxs("div", {
                        className: "space-y-1 text-right",
                        children: [
                          c.jsx("label", {
                            className:
                              "text-[10px] font-black text-slate-400 uppercase block text-right",
                            children: "اسم المصنع أو العامل القائم بالعمل",
                          }),
                          c.jsx("input", {
                            required: !0,
                            className:
                              "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold text-right outline-none",
                            value: fo,
                            onChange: (I) => ho(I.target.value),
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        className: "space-y-1 text-right",
                        children: [
                          c.jsx("label", {
                            className:
                              "text-[10px] font-black text-slate-400 uppercase block text-right",
                            children: "رقم الهاتف / التواصل",
                          }),
                          c.jsx("input", {
                            type: "text",
                            className:
                              "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold text-right outline-none",
                            value: zr,
                            onChange: (I) => en(I.target.value),
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        className: "space-y-1 text-right",
                        children: [
                          c.jsx("label", {
                            className:
                              "text-[10px] font-black text-slate-400 uppercase block text-right",
                            children: "الدور / المرحلة الأساسية",
                          }),
                          c.jsxs("select", {
                            required: !0,
                            className:
                              "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold text-right outline-none",
                            value: Nn,
                            onChange: (I) => Ta(I.target.value),
                            children: [
                              c.jsx("option", {
                                value: "cutting",
                                children: "🧵 قص",
                              }),
                              c.jsx("option", {
                                value: "sewing",
                                children: "🪡 تقفيل / خياطة",
                              }),
                              c.jsx("option", {
                                value: "packaging",
                                children: "📦 تغليف",
                              }),
                            ],
                          }),
                        ],
                      }),
                      c.jsx("button", {
                        type: "submit",
                        className:
                          "w-full bg-blue-600 text-white font-black py-4 rounded-xl shadow-md hover:bg-blue-700 transition-all mt-4",
                        children: "حفظ التغييرات",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          kf &&
            rn &&
            c.jsx("div", {
              className:
                "fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4",
              children: c.jsxs("div", {
                className:
                  "bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl text-right",
                children: [
                  c.jsxs("div", {
                    className:
                      "p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center text-right",
                    children: [
                      c.jsx("h3", {
                        className: "text-lg font-black text-slate-800",
                        children: "تعديل سجل الإنتاج 🛠️",
                      }),
                      c.jsx("button", {
                        onClick: () => {
                          (Zs(!1), po(null));
                        },
                        className:
                          "text-slate-400 font-bold hover:text-slate-600 p-1",
                        children: "✕",
                      }),
                    ],
                  }),
                  c.jsxs("form", {
                    onSubmit: oi,
                    className: "p-6 space-y-4 text-right",
                    children: [
                      c.jsxs("div", {
                        className:
                          "bg-slate-50 p-3 rounded-2xl text-xs font-bold text-slate-500 mb-2 text-right",
                        children: [
                          c.jsxs("p", {
                            children: [
                              "المنتج: ",
                              c.jsx("span", {
                                className: "text-slate-800 font-black",
                                children: rn.productName,
                              }),
                            ],
                          }),
                          c.jsxs("p", {
                            children: [
                              "المتفرع: ",
                              c.jsxs("span", {
                                className: "text-slate-800 font-black",
                                children: [rn.color, " / ", rn.size],
                              }),
                            ],
                          }),
                          c.jsxs("p", {
                            children: [
                              "المرحلة: ",
                              c.jsx("span", {
                                className: "text-blue-600 font-black",
                                children:
                                  rn.type === "cutting"
                                    ? "قص"
                                    : rn.type === "packaging"
                                      ? "تغليف"
                                      : "تقفيل",
                              }),
                            ],
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        className: "space-y-1 text-right",
                        children: [
                          c.jsx("label", {
                            className:
                              "text-[10px] font-black text-slate-400 uppercase block",
                            children: "التاريخ واليومية",
                          }),
                          c.jsx("input", {
                            type: "date",
                            required: !0,
                            className:
                              "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold text-right outline-none",
                            value: li,
                            onChange: (I) => Qs(I.target.value),
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                          c.jsxs("div", {
                            className: "space-y-1 text-right",
                            children: [
                              c.jsx("label", {
                                className:
                                  "text-[10px] font-black text-slate-400",
                                children: "الكمية المسلمة",
                              }),
                              c.jsx("input", {
                                type: "number",
                                required: !0,
                                className:
                                  "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-black font-sans text-right outline-none",
                                value: wr || "",
                                onFocus: (I) => I.target.select(),
                                onChange: (I) =>
                                  Ca(parseInt(I.target.value) || 0),
                              }),
                            ],
                          }),
                          c.jsxs("div", {
                            className: "space-y-1 text-right",
                            children: [
                              c.jsx("label", {
                                className:
                                  "text-[10px] font-black text-slate-400",
                                children: "سعر القطعة (ج.م)",
                              }),
                              c.jsx("input", {
                                type: "number",
                                required: !0,
                                className:
                                  "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-black font-sans text-right outline-none",
                                value: $r || "",
                                onFocus: (I) => I.target.select(),
                                onChange: (I) =>
                                  Oa(parseFloat(I.target.value) || 0),
                              }),
                            ],
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        className:
                          "bg-blue-50/50 p-2.5 rounded-xl text-center text-xs font-black text-blue-700",
                        children: [
                          "التكلفة الإجمالية الجديدة: ",
                          (wr * $r).toLocaleString(),
                          " ج.م",
                        ],
                      }),
                      c.jsx("button", {
                        type: "submit",
                        className:
                          "w-full bg-blue-600 text-white font-black py-4 rounded-xl shadow-md hover:bg-blue-700 transition-all mt-4",
                        children: "تأكيد وحفظ التعديلات",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          Fe.isOpen &&
            c.jsx("div", {
              className:
                "fixed inset-0 bg-black/60 backdrop-blur-sm z-[250] flex items-center justify-center p-4",
              children: c.jsxs("div", {
                className:
                  "bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl text-right animate-in zoom-in-95 duration-200",
                children: [
                  c.jsxs("div", {
                    className:
                      "p-6 bg-red-50 border-b border-red-100 flex justify-between items-center flex-row-reverse text-right",
                    children: [
                      c.jsx("h3", {
                        className: "text-lg font-black text-red-800",
                        children: Fe.title,
                      }),
                      c.jsx("button", {
                        onClick: () => rt((I) => ({ ...I, isOpen: !1 })),
                        className:
                          "text-red-400 font-bold hover:text-red-600 p-1",
                        children: "✕",
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "p-6 space-y-4 text-right",
                    children: [
                      c.jsx("p", {
                        className:
                          "text-sm font-bold text-slate-600 leading-relaxed text-right",
                        children: Fe.message,
                      }),
                      c.jsxs("div", {
                        className: "flex gap-3 mt-6",
                        children: [
                          c.jsx("button", {
                            type: "button",
                            onClick: () => {
                              (Fe.onConfirm(),
                                rt((I) => ({ ...I, isOpen: !1 })));
                            },
                            className:
                              "w-1/2 bg-red-600 text-white font-black py-3 rounded-2xl shadow-xl shadow-red-100 hover:bg-red-700 transition-all text-sm",
                            children: "نعم، تأكيد الحذف",
                          }),
                          c.jsx("button", {
                            type: "button",
                            onClick: () => rt((I) => ({ ...I, isOpen: !1 })),
                            className:
                              "w-1/2 bg-slate-100 text-slate-600 font-black py-3 rounded-2xl hover:bg-slate-200 transition-all text-sm",
                            children: "إلغاء",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
        ],
      });
  return ce && Br
    ? c.jsxs("div", {
        className: "space-y-6 pb-20",
        children: [
          c.jsxs("div", {
            className:
              "bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-6",
            children: [
              c.jsxs("div", {
                className: "flex items-center justify-between",
                children: [
                  c.jsxs("div", {
                    className: "text-right",
                    children: [
                      c.jsx("h2", {
                        className: "text-2xl font-black text-slate-800",
                        children: Br.name,
                      }),
                      c.jsx("p", {
                        className: "text-slate-400 font-bold text-sm",
                        children: "حسابات وسجل الورشة المالي",
                      }),
                    ],
                  }),
                  c.jsx("button", {
                    onClick: () => Ne(null),
                    className:
                      "p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400",
                    children: c.jsx(Ww, { size: 24 }),
                  }),
                ],
              }),
              c.jsxs("div", {
                className: "grid grid-cols-3 gap-4",
                children: [
                  c.jsxs("div", {
                    className: "bg-slate-50 p-4 rounded-3xl text-center",
                    children: [
                      c.jsx("p", {
                        className:
                          "text-[10px] text-slate-400 font-black uppercase mb-1",
                        children: "إجمالي المستحقات",
                      }),
                      c.jsxs("p", {
                        className: "text-lg font-black text-slate-800",
                        children: [
                          (Br.totalOwed || 0).toLocaleString(),
                          " ",
                          c.jsx("span", {
                            className: "text-[10px]",
                            children: "ج.م",
                          }),
                        ],
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "bg-slate-50 p-4 rounded-3xl text-center",
                    children: [
                      c.jsx("p", {
                        className:
                          "text-[10px] text-slate-400 font-black uppercase mb-1",
                        children: "إجمالي المدفوع",
                      }),
                      c.jsxs("p", {
                        className: "text-lg font-black text-slate-800",
                        children: [
                          (Br.totalPaid || 0).toLocaleString(),
                          " ",
                          c.jsx("span", {
                            className: "text-[10px]",
                            children: "ج.م",
                          }),
                        ],
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "bg-blue-50 p-4 rounded-3xl text-center",
                    children: [
                      c.jsx("p", {
                        className:
                          "text-[10px] text-blue-400 font-black uppercase mb-1",
                        children: "المتبقي له",
                      }),
                      c.jsxs("p", {
                        className: `text-lg font-black ${Br.remainingBalance > 0 ? "text-red-600" : "text-emerald-600"}`,
                        children: [
                          Math.abs(Br.remainingBalance || 0).toLocaleString(),
                          " ",
                          c.jsx("span", {
                            className: "text-[10px]",
                            children: "ج.م",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              c.jsx("div", {
                className: "flex gap-3",
                children: c.jsxs("button", {
                  onClick: () => {
                    (Xs(Br.id),
                      Ea("دفعة تحت الحساب / سلفة مقدمة"),
                      Ws(0),
                      Qt(!0));
                  },
                  className:
                    "w-full bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-100 flex items-center justify-center gap-2",
                  children: [
                    c.jsx(Rs, { size: 20 }),
                    "تسجيل دفعة تحت الحساب / سلفة",
                  ],
                }),
              }),
            ],
          }),
          c.jsxs("div", {
            className: "space-y-4",
            children: [
              c.jsxs("h3", {
                className:
                  "font-black text-slate-800 text-lg flex items-center gap-2 text-right justify-end",
                children: [
                  "سجل العمليات والدفعات",
                  c.jsx(P5, { size: 20, className: "text-slate-400" }),
                ],
              }),
              c.jsx("div", {
                className:
                  "bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden",
                children: c.jsxs("div", {
                  className: "divide-y divide-slate-50",
                  children: [
                    c.jsxs("div", {
                      className: "p-4 bg-slate-50/50",
                      children: [
                        c.jsx("p", {
                          className:
                            "text-xs font-black text-slate-400 mb-4 text-right",
                          children: "آخر مراحل التشغيل المُسجلة",
                        }),
                        c.jsx("div", {
                          className: "space-y-3",
                          children:
                            vo.length === 0
                              ? c.jsx("p", {
                                  className:
                                    "text-center text-xs text-slate-400 py-4",
                                  children:
                                    "لا يوجد إنتاج مستلم بعد لهذا العامل",
                                })
                              : vo.slice(0, 15).map((I) => {
                                  const W = I.paidAmount || 0,
                                    we = (I.totalCost || 0) - W,
                                    Ke = W >= (I.totalCost || 0);
                                  return c.jsxs(
                                    "div",
                                    {
                                      className:
                                        "bg-white p-4 rounded-2xl border border-slate-100 space-y-3 text-right shadow-sm relative group",
                                      children: [
                                        c.jsxs("div", {
                                          className:
                                            "absolute top-2 left-2 flex gap-1 bg-white/95 p-1.5 rounded-xl shadow-md border border-slate-100 z-30",
                                          children: [
                                            c.jsx("button", {
                                              type: "button",
                                              onClick: (Ze) => {
                                                (Ze.stopPropagation(), Ur(I));
                                              },
                                              className:
                                                "p-1 hover:text-blue-600 hover:bg-slate-50 text-slate-400 rounded transition-all cursor-pointer",
                                              title: "تعديل تفاصيل المرحلة",
                                              children: c.jsx(Zu, { size: 13 }),
                                            }),
                                            c.jsx("button", {
                                              type: "button",
                                              onClick: (Ze) => {
                                                (Ze.stopPropagation(),
                                                  mo(I.id));
                                              },
                                              className:
                                                "p-1 hover:text-red-600 hover:bg-slate-50 text-slate-400 rounded transition-all cursor-pointer",
                                              title: "حذف المرحلة بالكامل",
                                              children: c.jsx(gr, { size: 13 }),
                                            }),
                                          ],
                                        }),
                                        c.jsxs("div", {
                                          className:
                                            "flex justify-between items-center gap-4",
                                          children: [
                                            c.jsxs("div", {
                                              className:
                                                "flex items-center gap-3",
                                              children: [
                                                c.jsx("div", {
                                                  className:
                                                    "w-8 h-8 bg-slate-50 text-slate-500 rounded-lg flex items-center justify-center shrink-0",
                                                  children: c.jsx(vc, {
                                                    size: 16,
                                                  }),
                                                }),
                                                c.jsxs("div", {
                                                  className: "text-right",
                                                  children: [
                                                    c.jsxs("p", {
                                                      className:
                                                        "text-xs font-black text-slate-800",
                                                      children: [
                                                        I.productName,
                                                        " (",
                                                        I.color,
                                                        " / ",
                                                        I.size,
                                                        ")",
                                                      ],
                                                    }),
                                                    c.jsxs("div", {
                                                      className:
                                                        "flex items-center gap-1.5 mt-1",
                                                      children: [
                                                        c.jsx("span", {
                                                          className: `text-[9.5px] px-2 py-0.5 rounded-md font-bold ${I.type === "cutting" ? "bg-orange-50 text-orange-600 border border-orange-100" : I.type === "packaging" ? "bg-purple-50 text-purple-600 border border-purple-100" : "bg-blue-50 text-blue-600 border border-blue-100"}`,
                                                          children:
                                                            I.type === "cutting"
                                                              ? "قص 🧵"
                                                              : I.type ===
                                                                  "packaging"
                                                                ? "تغليف 📦"
                                                                : "تقفيل 🪡",
                                                        }),
                                                        c.jsx("span", {
                                                          className:
                                                            "text-[10px] text-slate-400 font-mono font-bold",
                                                          children: new Date(
                                                            I.date,
                                                          ).toLocaleDateString(
                                                            "ar-EG",
                                                          ),
                                                        }),
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            }),
                                            c.jsxs("div", {
                                              className:
                                                "text-left font-bold text-xs shrink-0 pl-14",
                                              children: [
                                                c.jsxs("p", {
                                                  className: "text-slate-800",
                                                  children: [
                                                    I.quantity,
                                                    " قطعة",
                                                  ],
                                                }),
                                                c.jsxs("p", {
                                                  className:
                                                    "text-[10px] text-slate-400 font-mono",
                                                  children: [
                                                    "بسعر ",
                                                    I.costPerItem,
                                                    " ج.م",
                                                  ],
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        c.jsxs("div", {
                                          className:
                                            "bg-slate-50/50 p-2.5 rounded-xl flex justify-between items-center text-xs font-bold gap-2",
                                          children: [
                                            c.jsxs("div", {
                                              className: "text-center",
                                              children: [
                                                c.jsx("p", {
                                                  className:
                                                    "text-[9px] text-slate-400 mb-0.5",
                                                  children: "التكلفة",
                                                }),
                                                c.jsxs("p", {
                                                  className:
                                                    "text-slate-800 font-black",
                                                  children: [
                                                    (
                                                      I.totalCost || 0
                                                    ).toLocaleString(),
                                                    " ج.م",
                                                  ],
                                                }),
                                              ],
                                            }),
                                            c.jsxs("div", {
                                              className: "text-center",
                                              children: [
                                                c.jsx("p", {
                                                  className:
                                                    "text-[9px] text-slate-400 mb-0.5",
                                                  children: "المسدد لها",
                                                }),
                                                c.jsxs("p", {
                                                  className:
                                                    "text-emerald-600 font-black",
                                                  children: [
                                                    W.toLocaleString(),
                                                    " ج.م",
                                                  ],
                                                }),
                                              ],
                                            }),
                                            c.jsxs("div", {
                                              className: "text-center",
                                              children: [
                                                c.jsx("p", {
                                                  className:
                                                    "text-[9px] text-slate-400 mb-0.5",
                                                  children: "المتبقي",
                                                }),
                                                c.jsxs("p", {
                                                  className:
                                                    "text-red-500 font-black",
                                                  children: [
                                                    we.toLocaleString(),
                                                    " ج.م",
                                                  ],
                                                }),
                                              ],
                                            }),
                                            c.jsx("div", {
                                              className: "mr-auto",
                                              children:
                                                ge === I.id
                                                  ? c.jsxs("div", {
                                                      className:
                                                        "flex items-center gap-1 justify-end",
                                                      children: [
                                                        c.jsx("input", {
                                                          type: "number",
                                                          value: V || "",
                                                          placeholder:
                                                            "مبلغ...",
                                                          onFocus: (Ze) =>
                                                            Ze.target.select(),
                                                          onChange: (Ze) =>
                                                            fe(
                                                              Number(
                                                                Ze.target.value,
                                                              ),
                                                            ),
                                                          className:
                                                            "w-16 p-1 text-center border border-indigo-200 rounded-lg text-xs font-sans font-bold bg-white outline-none",
                                                        }),
                                                        c.jsx("button", {
                                                          type: "button",
                                                          onClick: () => {
                                                            (Ji(I.id, V),
                                                              M(null),
                                                              fe(0));
                                                          },
                                                          className:
                                                            "bg-emerald-600 text-white p-1 rounded-lg hover:bg-emerald-700 transition",
                                                          title: "حفظ السداد",
                                                          children: "✓",
                                                        }),
                                                        c.jsx("button", {
                                                          type: "button",
                                                          onClick: () => {
                                                            (M(null), fe(0));
                                                          },
                                                          className:
                                                            "bg-slate-200 text-slate-500 p-1 rounded-lg hover:bg-slate-300",
                                                          children: "✕",
                                                        }),
                                                      ],
                                                    })
                                                  : c.jsx("div", {
                                                      children: Ke
                                                        ? c.jsx("span", {
                                                            className:
                                                              "text-[9px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md border border-emerald-100 font-black",
                                                            children: "✓ كاملة",
                                                          })
                                                        : c.jsx("button", {
                                                            type: "button",
                                                            onClick: () => {
                                                              (M(I.id), fe(we));
                                                            },
                                                            className:
                                                              "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-2.5 py-1 text-[10px] rounded-lg transition font-black",
                                                            children:
                                                              "دفع للمرحلة",
                                                          }),
                                                    }),
                                            }),
                                          ],
                                        }),
                                      ],
                                    },
                                    I.id,
                                  );
                                }),
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "p-4",
                      children: [
                        c.jsx("p", {
                          className:
                            "text-xs font-black text-slate-400 mb-4 text-right",
                          children: "المدفوعات المالية المستلمة",
                        }),
                        c.jsx("div", {
                          className: "space-y-3",
                          children:
                            (Br.payments || []).length === 0
                              ? c.jsx("p", {
                                  className:
                                    "text-center text-xs text-slate-400 py-4",
                                  children: "لا يوجد دفعات مسجلة بعد",
                                })
                              : (Br.payments || []).map((I) =>
                                  c.jsxs(
                                    "div",
                                    {
                                      className:
                                        "bg-emerald-50/30 p-3 rounded-2xl border border-emerald-100 flex justify-between items-center text-right group",
                                      children: [
                                        c.jsxs("div", {
                                          className: "flex items-center gap-3",
                                          children: [
                                            c.jsx("div", {
                                              className:
                                                "w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0",
                                              children: c.jsx(Rs, { size: 16 }),
                                            }),
                                            c.jsxs("div", {
                                              className: "text-right",
                                              children: [
                                                c.jsxs("p", {
                                                  className:
                                                    "text-xs font-black text-emerald-600",
                                                  children: [
                                                    "تسليم دفعة نقدية (",
                                                    I.amount.toLocaleString(),
                                                    " ج.م)",
                                                  ],
                                                }),
                                                c.jsxs("p", {
                                                  className:
                                                    "text-[9px] text-slate-400 font-bold",
                                                  children: [
                                                    new Date(
                                                      I.date,
                                                    ).toLocaleDateString(
                                                      "ar-EG",
                                                    ),
                                                    " • ",
                                                    I.note ||
                                                      "بدون ملاحظات إضافية",
                                                  ],
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                        c.jsxs("div", {
                                          className:
                                            "flex items-center gap-2 text-left shrink-0 z-10",
                                          children: [
                                            c.jsx("button", {
                                              type: "button",
                                              onClick: (W) => {
                                                (W.stopPropagation(),
                                                  Af(Br.id, I.id));
                                              },
                                              className:
                                                "p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition cursor-pointer z-20",
                                              title: "حذف الدفعة",
                                              children: c.jsx(gr, { size: 14 }),
                                            }),
                                            c.jsx(Fa, {
                                              size: 16,
                                              className: "text-emerald-500",
                                            }),
                                          ],
                                        }),
                                      ],
                                    },
                                    I.id,
                                  ),
                                ),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          c.jsx(MP, {
            isIntakeModalOpen: qe,
            setIsIntakeModalOpen: Ge,
            isPaymentModalOpen: st,
            setIsPaymentModalOpen: Qt,
            isWorkerModalOpen: Ue,
            setIsWorkerModalOpen: mt,
            isPackagingModalOpen: Sn,
            setIsPackagingModalOpen: zt,
            selectedStage: X,
            setSelectedStage: Se,
            intakeWorkerId: ke,
            setIntakeWorkerId: Ae,
            intakeDate: Ve,
            setIntakeDate: et,
            intakeItems: at,
            setIntakeItems: Ot,
            handleAddIntakeItem: Tf,
            handleRemoveIntakeItem: tr,
            handleRegisterIntake: xo,
            handlePayWorker: bo,
            paymentAmount: Gs,
            setPaymentAmount: Ws,
            paymentNote: Ys,
            setPaymentNote: Ea,
            payingWorkerId: co,
            setPayingWorkerId: Xs,
            workers: e,
            products: n,
            productionIntakes: a,
            newWorker: Kt,
            setNewWorker: si,
            handleCreateWorker: rl,
            pkgWorkerId: Ce,
            setPkgWorkerId: $t,
            pkgDate: Pt,
            setPkgDate: yt,
            pkgQuantity: Pn,
            setPkgQuantity: yr,
            pkgCostPerItem: oa,
            setPkgCostPerItem: Ht,
            handleRegisterPackaging: su,
          }),
          Zi(),
        ],
      })
    : c.jsxs("div", {
        className: "space-y-6 pb-20 text-right",
        dir: "rtl",
        children: [
          c.jsxs("div", {
            className:
              "flex flex-col md:flex-row md:items-center justify-between gap-4",
            children: [
              c.jsxs("div", {
                className: "text-right",
                children: [
                  c.jsx("h2", {
                    className: "text-2xl font-black text-slate-800",
                    children: "الإنتاج والورش",
                  }),
                  c.jsx("p", {
                    className: "text-slate-500 font-bold mt-1 text-sm",
                    children:
                      "متابعة دقيقة لمراحل (القص، التقفيل، التغليف) مع الحسابات",
                  }),
                ],
              }),
              c.jsxs("div", {
                className: "flex gap-2 w-full md:w-auto",
                children: [
                  c.jsxs("button", {
                    onClick: () => mt(!0),
                    className:
                      "flex-1 md:flex-none border-2 border-blue-600/10 bg-white text-blue-600 px-5 py-2.5 rounded-2xl flex items-center justify-center gap-2 font-black transition-all",
                    children: [
                      c.jsx(GV, { size: 18 }),
                      c.jsx("span", { children: "عامل/ورشة جديد" }),
                    ],
                  }),
                  c.jsxs("button", {
                    onClick: () => {
                      (Se(
                        f === "cutting" || f === "sewing" || f === "packaging"
                          ? f
                          : "cutting",
                      ),
                        Ae(""),
                        Ot([
                          {
                            productId: "",
                            variantId: "",
                            quantity: 0,
                            costPerItem: 0,
                            type: f === "sewing" ? "sewing" : "cutting",
                          },
                        ]),
                        $t(""),
                        yt(new Date().toISOString().split("T")[0]),
                        yr(0),
                        Ht(0),
                        Ge(!0));
                    },
                    className:
                      "flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-2xl flex items-center justify-center gap-2 font-black transition-all shadow-lg shadow-blue-100",
                    children: [
                      c.jsx(O5, { size: 18 }),
                      c.jsx("span", { children: "تسجيل مرحلة" }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          c.jsxs("div", {
            className: "flex flex-wrap bg-slate-100 p-1 rounded-3xl gap-1",
            children: [
              c.jsx("button", {
                onClick: () => h("production"),
                className: `flex-1 min-w-[120px] py-3 text-xs md:text-sm font-black rounded-2xl transition-all ${f === "production" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`,
                children: "📦 المخزون",
              }),
              c.jsx("button", {
                onClick: () => h("accounts"),
                className: `flex-1 min-w-[120px] py-3 text-xs md:text-sm font-black rounded-2xl transition-all ${f === "accounts" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`,
                children: "💰 حسابات العمال",
              }),
              c.jsx("button", {
                onClick: () => h("cutting"),
                className: `flex-1 min-w-[100px] py-3 text-xs md:text-sm font-black rounded-2xl transition-all ${f === "cutting" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`,
                children: "🧵 مرحلة القص",
              }),
              c.jsx("button", {
                onClick: () => h("sewing"),
                className: `flex-1 min-w-[100px] py-3 text-xs md:text-sm font-black rounded-2xl transition-all ${f === "sewing" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`,
                children: "🪡 مرحلة التقفيل",
              }),
              c.jsx("button", {
                onClick: () => h("packaging"),
                className: `flex-1 min-w-[100px] py-3 text-xs md:text-sm font-black rounded-2xl transition-all ${f === "packaging" ? "bg-white text-purple-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`,
                children: "📦 مرحلة التغليف",
              }),
            ],
          }),
          c.jsxs("div", {
            className:
              "bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4",
            children: [
              c.jsx("div", {
                className: "text-right",
                children: c.jsx("span", {
                  className: "text-xs text-slate-400 font-bold",
                  children: "ملخص إجمالي نشاط الورش من العمليات المسجلة",
                }),
              }),
              c.jsx("div", {
                className:
                  "flex items-center gap-2 overflow-x-auto w-full md:w-auto",
                children: c.jsxs("div", {
                  className:
                    "bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100 flex items-center gap-4 whitespace-nowrap w-full md:w-auto justify-between",
                  children: [
                    c.jsxs("div", {
                      className: "text-right",
                      children: [
                        c.jsx("p", {
                          className:
                            "text-[9px] text-slate-400 font-black uppercase",
                          children: "إجمالي مسموح القص",
                        }),
                        c.jsxs("p", {
                          className: "text-xs font-black text-orange-600",
                          children: [go.cutPieces, " قطعة"],
                        }),
                      ],
                    }),
                    c.jsx("div", { className: "w-px h-5 bg-slate-200" }),
                    c.jsxs("div", {
                      className: "text-right",
                      children: [
                        c.jsx("p", {
                          className:
                            "text-[9px] text-slate-400 font-black uppercase",
                          children: "إجمالي التقفيل",
                        }),
                        c.jsxs("p", {
                          className: "text-xs font-black text-blue-600",
                          children: [go.sewPieces, " قطعة"],
                        }),
                      ],
                    }),
                    c.jsx("div", { className: "w-px h-5 bg-slate-200" }),
                    c.jsxs("div", {
                      className: "text-right",
                      children: [
                        c.jsx("p", {
                          className:
                            "text-[9px] text-slate-400 font-black uppercase",
                          children: "إجمالي المغلف",
                        }),
                        c.jsxs("p", {
                          className: "text-xs font-black text-purple-600",
                          children: [go.pkgPieces, " قطعة"],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          f === "production" &&
            c.jsxs("div", {
              className: "space-y-6",
              children: [
                c.jsxs("div", {
                  className:
                    "bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-3",
                  children: [
                    c.jsx("div", {
                      className: "flex flex-col md:flex-row gap-3",
                      children: c.jsxs("div", {
                        className: "relative flex-1",
                        children: [
                          c.jsx(Zr, {
                            className:
                              "absolute right-4 top-1/2 -translate-y-1/2 text-slate-400",
                            size: 18,
                          }),
                          c.jsx("input", {
                            type: "text",
                            placeholder:
                              "ابحث باسم الموديل، كود الموديل، اللون، أو المقاس...",
                            className:
                              "w-full bg-slate-50 border-none rounded-2xl py-3 pr-11 pl-4 text-sm font-bold focus:ring-2 focus:ring-blue-100 transition-all text-right",
                            value: me,
                            onChange: (I) => Ie(I.target.value),
                          }),
                        ],
                      }),
                    }),
                    c.jsx("div", {
                      className:
                        "flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pt-3 border-t border-slate-100",
                      children: c.jsxs("div", {
                        className:
                          "flex flex-wrap bg-slate-100/75 p-1 rounded-2xl w-full lg:w-auto gap-1",
                        children: [
                          c.jsxs("button", {
                            onClick: () => b("all"),
                            className: `flex-1 lg:flex-none px-4 py-2 text-xs font-black rounded-xl transition-all whitespace-nowrap ${v === "all" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500"}`,
                            children: ["جميع الحالات (", nl.length, ")"],
                          }),
                          c.jsxs("button", {
                            onClick: () => b("available"),
                            className: `flex-1 lg:flex-none px-4 py-2 text-xs font-black rounded-xl transition-all whitespace-nowrap ${v === "available" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500"}`,
                            children: [
                              "📦 موجودة في المخزون (",
                              nl.filter(
                                (I) =>
                                  (g[I.variantId] || "available") ===
                                  "available",
                              ).length,
                              ")",
                            ],
                          }),
                          c.jsxs("button", {
                            onClick: () => b("shipped"),
                            className: `flex-1 lg:flex-none px-4 py-2 text-xs font-black rounded-xl transition-all whitespace-nowrap ${v === "shipped" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500"}`,
                            children: [
                              "🚚 خرجت في أوردر (",
                              nl.filter(
                                (I) =>
                                  (g[I.variantId] || "available") === "shipped",
                              ).length,
                              ")",
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
                (() => {
                  const I = nl.filter((W) => {
                    const we = me.toLowerCase().trim(),
                      Ke =
                        !we ||
                        W.productName.toLowerCase().includes(we) ||
                        W.productCode.toLowerCase().includes(we) ||
                        W.color.toLowerCase().includes(we) ||
                        W.size.toLowerCase().includes(we) ||
                        W.cutWorkers.some((Xe) =>
                          Xe.toLowerCase().includes(we),
                        ) ||
                        W.sewWorkers.some((Xe) =>
                          Xe.toLowerCase().includes(we),
                        ),
                      Ze = g[W.variantId] || "available";
                    return Ke && (v === "all" || Ze === v);
                  });
                  return I.length === 0
                    ? c.jsxs("div", {
                        className:
                          "bg-white p-20 rounded-[2.5rem] border border-dashed border-slate-200 text-center space-y-3",
                        children: [
                          c.jsx(vc, {
                            size: 52,
                            className: "mx-auto text-slate-300",
                          }),
                          c.jsx("p", {
                            className: "text-slate-400 font-bold text-base",
                            children:
                              "لا يوجد قطع جاهزة تطابق تصفية البحث الحالية",
                          }),
                          c.jsx("p", {
                            className: "text-xs text-slate-400",
                            children:
                              "عند تسجيل تفاصيل تشغيل لمرحلة قص أو تقفيل لأي موديل، ستظهر تجميعاتها هنا تلقائياً",
                          }),
                        ],
                      })
                    : c.jsx("div", {
                        className:
                          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                        children: I.map((W) => {
                          const we = g[W.variantId] || "available";
                          return c.jsxs(
                            "div",
                            {
                              className: `bg-white p-5 rounded-[2rem] border transition-all duration-300 flex flex-col justify-between text-right shadow-sm ${we === "shipped" ? "border-slate-150 bg-slate-50/40 opacity-70 hover:opacity-100 grayscale-[15%]" : "border-emerald-100/60 shadow-emerald-50/10 hover:border-emerald-200"}`,
                              children: [
                                c.jsxs("div", {
                                  children: [
                                    c.jsxs("div", {
                                      className:
                                        "flex justify-between items-start mb-4",
                                      children: [
                                        c.jsx("span", {
                                          className: `text-[10px] px-2.5 py-1 rounded-xl font-black ${we === "available" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-100 text-slate-500"}`,
                                          children:
                                            we === "available"
                                              ? "📦 موجودة في المخزون"
                                              : "🚚 خرجت في أوردر",
                                        }),
                                        c.jsxs("span", {
                                          className:
                                            "text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded-lg",
                                          children: [
                                            "كود: ",
                                            W.productCode || "N/A",
                                          ],
                                        }),
                                      ],
                                    }),
                                    c.jsx("h4", {
                                      className:
                                        "font-black text-slate-800 text-md truncate mb-1",
                                      children: W.productName,
                                    }),
                                    c.jsxs("div", {
                                      className: "flex gap-2 mb-4 justify-end",
                                      children: [
                                        c.jsxs("span", {
                                          className:
                                            "text-[10px] bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded-md font-bold",
                                          children: ["مقاس: ", W.size],
                                        }),
                                        c.jsxs("span", {
                                          className:
                                            "text-[10px] bg-rose-50 text-rose-600 px-2.5 py-0.5 rounded-md font-bold",
                                          children: ["لون: ", W.color],
                                        }),
                                      ],
                                    }),
                                    c.jsxs("div", {
                                      className:
                                        "space-y-3 p-4 bg-slate-50/80 rounded-2xl mb-4 text-xs font-bold text-slate-600",
                                      children: [
                                        c.jsxs("div", {
                                          className:
                                            "flex justify-between items-center text-right",
                                          children: [
                                            c.jsxs("div", {
                                              className:
                                                "flex items-center gap-1.5 text-right",
                                              children: [
                                                c.jsx("span", {
                                                  className: "text-orange-600",
                                                  children: "🧵 تم قص:",
                                                }),
                                                c.jsx("span", {
                                                  className:
                                                    "text-[10.5px] text-slate-500 font-bold truncate max-w-[130px]",
                                                  title:
                                                    W.cutWorkers.join("، "),
                                                  children:
                                                    W.cutWorkers.length > 0
                                                      ? W.cutWorkers.join("، ")
                                                      : "غير محدد",
                                                }),
                                              ],
                                            }),
                                            c.jsxs("div", {
                                              className: "text-left",
                                              children: [
                                                c.jsx("span", {
                                                  className:
                                                    "text-slate-800 font-black",
                                                  children: W.cutQty,
                                                }),
                                                " قطعة",
                                              ],
                                            }),
                                          ],
                                        }),
                                        c.jsxs("div", {
                                          className:
                                            "flex justify-between items-center text-right",
                                          children: [
                                            c.jsxs("div", {
                                              className:
                                                "flex items-center gap-1.5 text-right",
                                              children: [
                                                c.jsx("span", {
                                                  className: "text-blue-600",
                                                  children: "🪡 تم تقفيل:",
                                                }),
                                                c.jsx("span", {
                                                  className:
                                                    "text-[10.5px] text-slate-500 font-bold truncate max-w-[130px]",
                                                  title:
                                                    W.sewWorkers.join("، "),
                                                  children:
                                                    W.sewWorkers.length > 0
                                                      ? W.sewWorkers.join("، ")
                                                      : "غير محدد",
                                                }),
                                              ],
                                            }),
                                            c.jsxs("div", {
                                              className: "text-left",
                                              children: [
                                                c.jsx("span", {
                                                  className:
                                                    "text-slate-800 font-black",
                                                  children: W.sewQty,
                                                }),
                                                " قطعة",
                                              ],
                                            }),
                                          ],
                                        }),
                                        c.jsxs("div", {
                                          className:
                                            "pt-2 border-t border-slate-200/50",
                                          children: [
                                            c.jsxs("div", {
                                              className:
                                                "flex justify-between items-center mb-1 text-[10px] text-slate-400",
                                              children: [
                                                c.jsxs("span", {
                                                  className:
                                                    "text-emerald-600 font-black",
                                                  children: [
                                                    "نسبة التقفيل: ",
                                                    W.cutQty > 0
                                                      ? Math.round(
                                                          (W.sewQty /
                                                            W.cutQty) *
                                                            100,
                                                        )
                                                      : 0,
                                                    "%",
                                                  ],
                                                }),
                                                c.jsx("span", {
                                                  children: "جاهزية التشغيل",
                                                }),
                                              ],
                                            }),
                                            c.jsx("div", {
                                              className:
                                                "w-full bg-slate-200/50 rounded-full h-1.5 overflow-hidden",
                                              children: c.jsx("div", {
                                                className:
                                                  "bg-emerald-500 h-1.5 rounded-full transition-all duration-300",
                                                style: {
                                                  width: `${Math.min(100, W.cutQty > 0 ? (W.sewQty / W.cutQty) * 100 : 0)}%`,
                                                },
                                              }),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                c.jsxs("div", {
                                  className:
                                    "border-t border-slate-100 pt-3 mt-auto",
                                  children: [
                                    c.jsx("label", {
                                      className:
                                        "text-[10px] text-slate-400 font-bold block mb-1",
                                      children: "تحديث حالة القطعة بالمخزن",
                                    }),
                                    c.jsxs("select", {
                                      value: we,
                                      onChange: (Ke) =>
                                        Cf(W.variantId, Ke.target.value),
                                      className:
                                        "w-full bg-slate-50 border-none rounded-xl py-2 px-3 text-[11px] font-bold text-slate-600 text-right outline-none cursor-pointer focus:ring-1 focus:ring-slate-200",
                                      children: [
                                        c.jsx("option", {
                                          value: "available",
                                          children: "📦 متوفر بالمخزن",
                                        }),
                                        c.jsx("option", {
                                          value: "shipped",
                                          children: "🚚 خرجت في أوردر (شحن)",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            },
                            W.variantId,
                          );
                        }),
                      });
                })(),
              ],
            }),
          f === "accounts" &&
            c.jsxs("div", {
              className: "space-y-6",
              children: [
                c.jsx("div", {
                  className:
                    "bg-white p-4 rounded-3xl border border-slate-100 shadow-sm",
                  children: c.jsxs("div", {
                    className:
                      "flex flex-col lg:flex-row gap-3 items-stretch lg:items-center",
                    children: [
                      c.jsxs("div", {
                        className: "relative flex-1",
                        children: [
                          c.jsx(Zr, {
                            className:
                              "absolute right-4 top-1/2 -translate-y-1/2 text-slate-400",
                            size: 18,
                          }),
                          c.jsx("input", {
                            type: "text",
                            placeholder: "ابحث باسم العامل أو الورشة...",
                            className:
                              "w-full bg-slate-50 border-none rounded-2xl py-3 pr-11 pl-4 text-sm font-bold focus:ring-2 focus:ring-blue-105 transition-all text-right",
                            value: w,
                            onChange: (I) => N(I.target.value),
                          }),
                        ],
                      }),
                      c.jsx("div", {
                        className: "text-right shrink-0",
                        children: c.jsxs("select", {
                          value: S,
                          onChange: (I) => k(I.target.value),
                          className:
                            "bg-slate-50 border-none rounded-2xl py-3 px-4 text-xs font-black text-slate-700 text-right outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer min-w-[170px] h-full",
                          children: [
                            c.jsx("option", {
                              value: "all",
                              children: "كل العمال والمصانع",
                            }),
                            e.map((I) =>
                              c.jsx(
                                "option",
                                { value: I.id, children: I.name },
                                I.id,
                              ),
                            ),
                          ],
                        }),
                      }),
                      c.jsxs("div", {
                        className:
                          "flex items-center gap-1 bg-slate-50 px-3 py-2 rounded-2xl self-stretch lg:self-auto",
                        children: [
                          c.jsxs("div", {
                            className: "flex items-center gap-1.5",
                            children: [
                              c.jsx("span", {
                                className:
                                  "text-[10px] text-slate-400 font-black",
                                children: "من:",
                              }),
                              c.jsx("input", {
                                type: "date",
                                value: E,
                                onChange: (I) => A(I.target.value),
                                className:
                                  "bg-transparent border-none p-0 text-xs font-bold text-slate-700 outline-none w-28 focus:ring-0 text-right font-sans",
                              }),
                            ],
                          }),
                          c.jsx("div", {
                            className: "w-px h-4 bg-slate-200 mx-1",
                          }),
                          c.jsxs("div", {
                            className: "flex items-center gap-1.5",
                            children: [
                              c.jsx("span", {
                                className:
                                  "text-[10px] text-slate-400 font-black",
                                children: "إلى:",
                              }),
                              c.jsx("input", {
                                type: "date",
                                value: T,
                                onChange: (I) => P(I.target.value),
                                className:
                                  "bg-transparent border-none p-0 text-xs font-bold text-slate-700 outline-none w-28 focus:ring-0 text-right font-sans",
                              }),
                            ],
                          }),
                          (E || T) &&
                            c.jsx("button", {
                              onClick: () => {
                                (A(""), P(""));
                              },
                              className:
                                "text-xs font-black text-red-500 hover:text-red-700 mr-2 bg-red-50 px-2 py-0.5 rounded-lg",
                              children: "مسح ✕",
                            }),
                        ],
                      }),
                    ],
                  }),
                }),
                c.jsxs("div", {
                  className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                  children: [
                    c.jsxs("div", {
                      className:
                        "bg-gradient-to-br from-indigo-50 to-indigo-100/40 p-5 rounded-[2rem] border border-indigo-100/50 shadow-sm text-right flex flex-col justify-between",
                      children: [
                        c.jsxs("div", {
                          className: "flex justify-between items-center mb-3",
                          children: [
                            c.jsx("p", {
                              className:
                                "text-[11px] text-indigo-500 font-black uppercase",
                              children: "إجمالي قيمة تشغيل الإنتاج",
                            }),
                            c.jsx("div", {
                              className:
                                "w-10 h-10 bg-indigo-500/10 text-indigo-700 rounded-xl flex items-center justify-center",
                              children: c.jsx(R5, { size: 20 }),
                            }),
                          ],
                        }),
                        c.jsx("div", {
                          children: c.jsxs("h3", {
                            className: "text-2xl font-black text-slate-800",
                            children: [
                              Yn.reduce(
                                (I, W) => I + (W.totalOwed || 0),
                                0,
                              ).toLocaleString(),
                              " ",
                              c.jsx("span", {
                                className: "text-xs",
                                children: "ج.م",
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      className:
                        "bg-gradient-to-br from-emerald-50 to-emerald-100/40 p-5 rounded-[2rem] border border-emerald-100/50 shadow-sm text-right flex flex-col justify-between",
                      children: [
                        c.jsxs("div", {
                          className: "flex justify-between items-center mb-3",
                          children: [
                            c.jsx("p", {
                              className:
                                "text-[11px] text-emerald-500 font-black uppercase",
                              children: "إجمالي المبالغ المصروفة",
                            }),
                            c.jsx("div", {
                              className:
                                "w-10 h-10 bg-emerald-500/10 text-emerald-700 rounded-xl flex items-center justify-center",
                              children: c.jsx(Fa, { size: 20 }),
                            }),
                          ],
                        }),
                        c.jsx("div", {
                          children: c.jsxs("h3", {
                            className: "text-2xl font-black text-slate-800",
                            children: [
                              Yn.reduce(
                                (I, W) => I + (W.totalPaid || 0),
                                0,
                              ).toLocaleString(),
                              " ",
                              c.jsx("span", {
                                className: "text-xs",
                                children: "ج.م",
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      className:
                        "bg-gradient-to-br from-red-50 to-red-100/40 p-5 rounded-[2rem] border border-red-100/50 shadow-sm text-right flex flex-col justify-between",
                      children: [
                        c.jsxs("div", {
                          className: "flex justify-between items-center mb-3",
                          children: [
                            c.jsx("p", {
                              className:
                                "text-[11px] text-red-500 font-black uppercase",
                              children: "إجمالي المتبقي المستحق",
                            }),
                            c.jsx("div", {
                              className:
                                "w-10 h-10 bg-red-500/10 text-red-700 rounded-xl flex items-center justify-center",
                              children: c.jsx(Rs, { size: 20 }),
                            }),
                          ],
                        }),
                        c.jsx("div", {
                          children: c.jsxs("h3", {
                            className: "text-2xl font-black text-slate-800",
                            children: [
                              Yn.reduce(
                                (I, W) => I + (W.remainingBalance || 0),
                                0,
                              ).toLocaleString(),
                              " ",
                              c.jsx("span", {
                                className: "text-xs",
                                children: "ج.م",
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                c.jsxs("div", {
                  className: "space-y-4",
                  children: [
                    c.jsxs("div", {
                      className: "flex items-center gap-2 justify-start",
                      children: [
                        c.jsx(by, { size: 18, className: "text-blue-500" }),
                        c.jsx("h3", {
                          className: "text-md font-black text-slate-800",
                          children: "الأرصدة وبطاقات كشف حساب العمال والورش",
                        }),
                      ],
                    }),
                    c.jsx("div", {
                      className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                      children: Dn.map((I) => {
                        const W = Of(I);
                        return c.jsxs(
                          "div",
                          {
                            className:
                              "bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-4 hover:border-blue-100 transition-all text-right",
                            children: [
                              c.jsxs("div", {
                                className: "flex justify-between items-start",
                                children: [
                                  c.jsxs("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                      c.jsx("div", {
                                        className:
                                          "w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-lg",
                                        children: I.name[0],
                                      }),
                                      c.jsxs("div", {
                                        className: "text-right",
                                        children: [
                                          c.jsx("h4", {
                                            className:
                                              "font-black text-slate-800",
                                            children: I.name,
                                          }),
                                          c.jsx("div", {
                                            className: `mt-1 text-[10px] px-2 py-0.5 rounded-full inline-block font-black ${W.color}`,
                                            children: W.label,
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  c.jsxs("div", {
                                    className: "text-left",
                                    children: [
                                      c.jsx("p", {
                                        className:
                                          "text-[10px] text-slate-400 font-black uppercase",
                                        children: "المتبقي له",
                                      }),
                                      c.jsxs("p", {
                                        className: `text-lg font-black ${I.remainingBalance > 0 ? "text-red-600" : "text-emerald-600"}`,
                                        children: [
                                          Math.abs(
                                            I.remainingBalance || 0,
                                          ).toLocaleString(),
                                          " ",
                                          c.jsx("span", {
                                            className: "text-[10px]",
                                            children: "ج.م",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              c.jsxs("div", {
                                className: "flex gap-2",
                                children: [
                                  c.jsxs("button", {
                                    onClick: () => Ne(I.id),
                                    className:
                                      "flex-1 bg-slate-50 text-slate-600 py-3 rounded-2xl text-xs font-black hover:bg-slate-100 transition-all flex items-center justify-center gap-2",
                                    children: [
                                      c.jsx(Hp, { size: 16 }),
                                      "تفاصيل كشف السجل والماليات",
                                    ],
                                  }),
                                  c.jsx("button", {
                                    onClick: () => {
                                      (Xs(I.id), Qt(!0));
                                    },
                                    className:
                                      "px-4 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-100 transition-all",
                                    title: "صرف دفعة نقدية لشريك العمل",
                                    children: c.jsx(Rs, { size: 18 }),
                                  }),
                                  c.jsx("button", {
                                    onClick: () => an(I),
                                    className:
                                      "px-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-2xl transition-all",
                                    title: "تعديل بيانات ورشة العمل",
                                    children: c.jsx(Zu, { size: 16 }),
                                  }),
                                  c.jsx("button", {
                                    onClick: () => _f(I.id),
                                    className:
                                      "px-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl transition-all",
                                    title: "حذف ورشة العمل وكل سجلاتها",
                                    children: c.jsx(gr, { size: 16 }),
                                  }),
                                ],
                              }),
                            ],
                          },
                          I.id,
                        );
                      }),
                    }),
                  ],
                }),
              ],
            }),
          f === "cutting" &&
            c.jsxs("div", {
              className: "space-y-4",
              children: [
                c.jsx("div", {
                  className:
                    "bg-white p-4 rounded-3xl border border-slate-100 shadow-sm",
                  children: c.jsxs("div", {
                    className:
                      "flex flex-col lg:flex-row gap-3 items-stretch lg:items-center",
                    children: [
                      c.jsxs("div", {
                        className: "relative flex-1",
                        children: [
                          c.jsx(Zr, {
                            className:
                              "absolute right-4 top-1/2 -translate-y-1/2 text-slate-400",
                            size: 18,
                          }),
                          c.jsx("input", {
                            type: "text",
                            placeholder:
                              "ابحث بالموديل، اسم القاص، أو رقم الإيصال...",
                            className:
                              "w-full bg-slate-50 border-none rounded-2xl py-3 pr-11 pl-4 text-sm font-bold focus:ring-2 focus:ring-blue-105 transition-all text-right",
                            value: C,
                            onChange: (I) => D(I.target.value),
                          }),
                        ],
                      }),
                      c.jsx("div", {
                        className: "text-right shrink-0",
                        children: c.jsxs("select", {
                          value: O,
                          onChange: (I) => L(I.target.value),
                          className:
                            "bg-slate-50 border-none rounded-2xl py-3 px-4 text-xs font-black text-slate-700 text-right outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer min-w-[170px] h-full",
                          children: [
                            c.jsx("option", {
                              value: "all",
                              children: "كل عمال القص",
                            }),
                            e
                              .filter((I) => I.role === "cutting")
                              .map((I) =>
                                c.jsx(
                                  "option",
                                  { value: I.id, children: I.name },
                                  I.id,
                                ),
                              ),
                          ],
                        }),
                      }),
                      c.jsxs("div", {
                        className:
                          "flex items-center gap-1 bg-slate-50 px-3 py-2 rounded-2xl self-stretch lg:self-auto",
                        children: [
                          c.jsxs("div", {
                            className: "flex items-center gap-1.5",
                            children: [
                              c.jsx("span", {
                                className:
                                  "text-[10px] text-slate-400 font-black",
                                children: "من:",
                              }),
                              c.jsx("input", {
                                type: "date",
                                value: z,
                                onChange: (I) => K(I.target.value),
                                className:
                                  "bg-transparent border-none p-0 text-xs font-bold text-slate-700 outline-none w-28 focus:ring-0 text-right font-sans",
                              }),
                            ],
                          }),
                          c.jsx("div", {
                            className: "w-px h-4 bg-slate-200 mx-1",
                          }),
                          c.jsxs("div", {
                            className: "flex items-center gap-1.5",
                            children: [
                              c.jsx("span", {
                                className:
                                  "text-[10px] text-slate-400 font-black",
                                children: "إلى:",
                              }),
                              c.jsx("input", {
                                type: "date",
                                value: q,
                                onChange: (I) => te(I.target.value),
                                className:
                                  "bg-transparent border-none p-0 text-xs font-bold text-slate-700 outline-none w-28 focus:ring-0 text-right font-sans",
                              }),
                            ],
                          }),
                          (z || q) &&
                            c.jsx("button", {
                              onClick: () => {
                                (K(""), te(""));
                              },
                              className:
                                "text-xs font-black text-red-500 hover:text-red-700 mr-2 bg-red-50 px-2 py-0.5 rounded-lg",
                              children: "مسح ✕",
                            }),
                        ],
                      }),
                    ],
                  }),
                }),
                c.jsx("div", {
                  className: "flex justify-between items-center",
                  children: c.jsxs("h3", {
                    className:
                      "text-md font-black text-slate-800 flex items-center gap-2",
                    children: [
                      c.jsx(_V, { size: 18, className: "text-orange-500" }),
                      c.jsx("span", { children: "سجلات إنتاج مرحلة القص" }),
                    ],
                  }),
                }),
                c.jsx("div", {
                  className:
                    "bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm",
                  children: c.jsx("div", {
                    className: "overflow-x-auto",
                    children: c.jsxs("table", {
                      className: "w-full text-right border-collapse text-xs",
                      children: [
                        c.jsx("thead", {
                          children: c.jsxs("tr", {
                            className:
                              "bg-slate-50 text-slate-400 font-black border-b border-slate-100",
                            children: [
                              c.jsx("th", {
                                className: "p-4",
                                children: "رقم السجل",
                              }),
                              c.jsx("th", {
                                className: "p-4",
                                children: "التاريخ",
                              }),
                              c.jsx("th", {
                                className: "p-4",
                                children: "اسم القاص / العامل",
                              }),
                              c.jsx("th", {
                                className: "p-4",
                                children: "المنتج والموديل",
                              }),
                              c.jsx("th", {
                                className: "p-4",
                                children: "اللون / المقاس",
                              }),
                              c.jsx("th", {
                                className: "p-4 text-center",
                                children: "الكمية",
                              }),
                              c.jsx("th", {
                                className:
                                  "p-4 text-left border-l border-slate-100",
                                children: "التكلفة الإجمالية",
                              }),
                              c.jsx("th", {
                                className: "p-4 text-center",
                                children: "إجراءات",
                              }),
                            ],
                          }),
                        }),
                        c.jsx("tbody", {
                          className:
                            "divide-y divide-slate-50 text-slate-700 font-bold",
                          children:
                            Ef.length === 0
                              ? c.jsx("tr", {
                                  children: c.jsx("td", {
                                    colSpan: 8,
                                    className:
                                      "text-center p-12 text-slate-400",
                                    children: "لا يوجد سجلات تشغيل قص حتى الآن",
                                  }),
                                })
                              : Ef.map((I) =>
                                  c.jsxs(
                                    "tr",
                                    {
                                      className: "hover:bg-slate-50/50",
                                      children: [
                                        c.jsx("td", {
                                          className:
                                            "p-4 font-mono text-slate-400",
                                          children: I.receiptId || "بدون",
                                        }),
                                        c.jsx("td", {
                                          className: "p-4",
                                          children: new Date(
                                            I.date,
                                          ).toLocaleDateString("ar-EG"),
                                        }),
                                        c.jsx("td", {
                                          className:
                                            "p-4 font-black text-slate-800",
                                          children: I.workerName,
                                        }),
                                        c.jsx("td", {
                                          className: "p-4 text-slate-800",
                                          children: I.productName,
                                        }),
                                        c.jsxs("td", {
                                          className: "p-4",
                                          children: [I.color, " / ", I.size],
                                        }),
                                        c.jsxs("td", {
                                          className:
                                            "p-4 text-center font-black text-orange-600",
                                          children: [I.quantity, " قطعة"],
                                        }),
                                        c.jsxs("td", {
                                          className:
                                            "p-4 text-left font-black text-slate-900 border-l border-slate-50",
                                          children: [
                                            (I.totalCost || 0).toLocaleString(),
                                            " ج.م",
                                          ],
                                        }),
                                        c.jsx("td", {
                                          className: "p-4 text-center",
                                          children: c.jsxs("div", {
                                            className:
                                              "flex justify-center gap-1.5",
                                            children: [
                                              c.jsx("button", {
                                                onClick: () => Ur(I),
                                                className:
                                                  "p-1.5 hover:text-blue-600 hover:bg-blue-50 text-slate-400 rounded-lg transition-all",
                                                title: "تعديل السجل",
                                                children: c.jsx(Zu, {
                                                  size: 14,
                                                }),
                                              }),
                                              c.jsx("button", {
                                                onClick: () => mo(I.id),
                                                className:
                                                  "p-1.5 hover:text-red-600 hover:bg-red-50 text-slate-400 rounded-lg transition-all",
                                                title: "حذف السجل",
                                                children: c.jsx(gr, {
                                                  size: 14,
                                                }),
                                              }),
                                            ],
                                          }),
                                        }),
                                      ],
                                    },
                                    I.id,
                                  ),
                                ),
                        }),
                      ],
                    }),
                  }),
                }),
              ],
            }),
          f === "sewing" &&
            c.jsxs("div", {
              className: "space-y-4",
              children: [
                c.jsx("div", {
                  className:
                    "bg-white p-4 rounded-3xl border border-slate-100 shadow-sm",
                  children: c.jsxs("div", {
                    className:
                      "flex flex-col lg:flex-row gap-3 items-stretch lg:items-center",
                    children: [
                      c.jsxs("div", {
                        className: "relative flex-1",
                        children: [
                          c.jsx(Zr, {
                            className:
                              "absolute right-4 top-1/2 -translate-y-1/2 text-slate-400",
                            size: 18,
                          }),
                          c.jsx("input", {
                            type: "text",
                            placeholder:
                              "ابحث بالموديل، اسم الورشة، أو رقم السجل...",
                            className:
                              "w-full bg-slate-50 border-none rounded-2xl py-3 pr-11 pl-4 text-sm font-bold focus:ring-2 focus:ring-blue-105 transition-all text-right",
                            value: xe,
                            onChange: (I) => ie(I.target.value),
                          }),
                        ],
                      }),
                      c.jsx("div", {
                        className: "text-right shrink-0",
                        children: c.jsxs("select", {
                          value: B,
                          onChange: (I) => se(I.target.value),
                          className:
                            "bg-slate-50 border-none rounded-2xl py-3 px-4 text-xs font-black text-slate-700 text-right outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer min-w-[170px] h-full",
                          children: [
                            c.jsx("option", {
                              value: "all",
                              children: "كل ورش التقفيل",
                            }),
                            e
                              .filter((I) => I.role === "sewing")
                              .map((I) =>
                                c.jsx(
                                  "option",
                                  { value: I.id, children: I.name },
                                  I.id,
                                ),
                              ),
                          ],
                        }),
                      }),
                      c.jsxs("div", {
                        className:
                          "flex items-center gap-1 bg-slate-50 px-3 py-2 rounded-2xl self-stretch lg:self-auto",
                        children: [
                          c.jsxs("div", {
                            className: "flex items-center gap-1.5",
                            children: [
                              c.jsx("span", {
                                className:
                                  "text-[10px] text-slate-400 font-black",
                                children: "من:",
                              }),
                              c.jsx("input", {
                                type: "date",
                                value: ue,
                                onChange: (I) => ye(I.target.value),
                                className:
                                  "bg-transparent border-none p-0 text-xs font-bold text-slate-700 outline-none w-28 focus:ring-0 text-right font-sans",
                              }),
                            ],
                          }),
                          c.jsx("div", {
                            className: "w-px h-4 bg-slate-200 mx-1",
                          }),
                          c.jsxs("div", {
                            className: "flex items-center gap-1.5",
                            children: [
                              c.jsx("span", {
                                className:
                                  "text-[10px] text-slate-400 font-black",
                                children: "إلى:",
                              }),
                              c.jsx("input", {
                                type: "date",
                                value: ne,
                                onChange: (I) => $(I.target.value),
                                className:
                                  "bg-transparent border-none p-0 text-xs font-bold text-slate-700 outline-none w-28 focus:ring-0 text-right font-sans",
                              }),
                            ],
                          }),
                          (ue || ne) &&
                            c.jsx("button", {
                              onClick: () => {
                                (ye(""), $(""));
                              },
                              className:
                                "text-xs font-black text-red-500 hover:text-red-700 mr-2 bg-red-50 px-2 py-0.5 rounded-lg",
                              children: "مسح ✕",
                            }),
                        ],
                      }),
                    ],
                  }),
                }),
                c.jsx("div", {
                  className: "flex justify-between items-center",
                  children: c.jsxs("h3", {
                    className:
                      "text-md font-black text-slate-800 flex items-center gap-2",
                    children: [
                      c.jsx(vc, { size: 18, className: "text-blue-500" }),
                      c.jsx("span", {
                        children: "سجلات إنتاج مرحلة التقفيل والتربيط",
                      }),
                    ],
                  }),
                }),
                c.jsx("div", {
                  className:
                    "bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm",
                  children: c.jsx("div", {
                    className: "overflow-x-auto",
                    children: c.jsxs("table", {
                      className: "w-full text-right border-collapse text-xs",
                      children: [
                        c.jsx("thead", {
                          children: c.jsxs("tr", {
                            className:
                              "bg-slate-50 text-slate-400 font-black border-b border-slate-100",
                            children: [
                              c.jsx("th", {
                                className: "p-4",
                                children: "رقم السجل",
                              }),
                              c.jsx("th", {
                                className: "p-4",
                                children: "التاريخ",
                              }),
                              c.jsx("th", {
                                className: "p-4",
                                children: "اسم ورشة التقفيل",
                              }),
                              c.jsx("th", {
                                className: "p-4",
                                children: "المنتج والموديل",
                              }),
                              c.jsx("th", {
                                className: "p-4",
                                children: "اللون / المقاس",
                              }),
                              c.jsx("th", {
                                className: "p-4 text-center",
                                children: "الكمية",
                              }),
                              c.jsx("th", {
                                className:
                                  "p-4 text-left border-l border-slate-100",
                                children: "التكلفة الإجمالية",
                              }),
                              c.jsx("th", {
                                className: "p-4 text-center",
                                children: "إجراءات",
                              }),
                            ],
                          }),
                        }),
                        c.jsx("tbody", {
                          className:
                            "divide-y divide-slate-50 text-slate-700 font-bold",
                          children:
                            el.length === 0
                              ? c.jsx("tr", {
                                  children: c.jsx("td", {
                                    colSpan: 8,
                                    className:
                                      "text-center p-12 text-slate-400",
                                    children:
                                      "لا يوجد سجلات تشغيل تقفيل حتى الآن",
                                  }),
                                })
                              : el.map((I) =>
                                  c.jsxs(
                                    "tr",
                                    {
                                      className: "hover:bg-slate-50/50",
                                      children: [
                                        c.jsx("td", {
                                          className:
                                            "p-4 font-mono text-slate-400",
                                          children: I.receiptId || "بدون",
                                        }),
                                        c.jsx("td", {
                                          className: "p-4",
                                          children: new Date(
                                            I.date,
                                          ).toLocaleDateString("ar-EG"),
                                        }),
                                        c.jsx("td", {
                                          className:
                                            "p-4 font-black text-slate-800",
                                          children: I.workerName,
                                        }),
                                        c.jsx("td", {
                                          className: "p-4 text-slate-800",
                                          children: I.productName,
                                        }),
                                        c.jsxs("td", {
                                          className: "p-4",
                                          children: [I.color, " / ", I.size],
                                        }),
                                        c.jsxs("td", {
                                          className:
                                            "p-4 text-center font-black text-blue-600",
                                          children: [I.quantity, " قطعة"],
                                        }),
                                        c.jsxs("td", {
                                          className:
                                            "p-4 text-left font-black text-slate-900 border-l border-slate-50",
                                          children: [
                                            (I.totalCost || 0).toLocaleString(),
                                            " ج.م",
                                          ],
                                        }),
                                        c.jsx("td", {
                                          className: "p-4 text-center",
                                          children: c.jsxs("div", {
                                            className:
                                              "flex justify-center gap-1.5",
                                            children: [
                                              c.jsx("button", {
                                                onClick: () => Ur(I),
                                                className:
                                                  "p-1.5 hover:text-blue-600 hover:bg-blue-50 text-slate-400 rounded-lg transition-all",
                                                title: "تعديل السجل",
                                                children: c.jsx(Zu, {
                                                  size: 14,
                                                }),
                                              }),
                                              c.jsx("button", {
                                                onClick: () => mo(I.id),
                                                className:
                                                  "p-1.5 hover:text-red-600 hover:bg-red-50 text-slate-400 rounded-lg transition-all",
                                                title: "حذف السجل",
                                                children: c.jsx(gr, {
                                                  size: 14,
                                                }),
                                              }),
                                            ],
                                          }),
                                        }),
                                      ],
                                    },
                                    I.id,
                                  ),
                                ),
                        }),
                      ],
                    }),
                  }),
                }),
              ],
            }),
          f === "packaging" &&
            c.jsxs("div", {
              className: "space-y-4",
              children: [
                c.jsx("div", {
                  className:
                    "bg-white p-4 rounded-3xl border border-slate-100 shadow-sm",
                  children: c.jsxs("div", {
                    className:
                      "flex flex-col lg:flex-row gap-3 items-stretch lg:items-center",
                    children: [
                      c.jsxs("div", {
                        className: "relative flex-1",
                        children: [
                          c.jsx(Zr, {
                            className:
                              "absolute right-4 top-1/2 -translate-y-1/2 text-slate-400",
                            size: 18,
                          }),
                          c.jsx("input", {
                            type: "text",
                            placeholder:
                              "ابحث بالموديل، اسم المغلف، أو رقم العملية...",
                            className:
                              "w-full bg-slate-50 border-none rounded-2xl py-3 pr-11 pl-4 text-sm font-bold focus:ring-2 focus:ring-blue-105 transition-all text-right",
                            value: Y,
                            onChange: (I) => he(I.target.value),
                          }),
                        ],
                      }),
                      c.jsx("div", {
                        className: "text-right shrink-0",
                        children: c.jsxs("select", {
                          value: oe,
                          onChange: (I) => Z(I.target.value),
                          className:
                            "bg-slate-50 border-none rounded-2xl py-3 px-4 text-xs font-black text-slate-700 text-right outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer min-w-[170px] h-full",
                          children: [
                            c.jsx("option", {
                              value: "all",
                              children: "كل عمال التغليف",
                            }),
                            e
                              .filter((I) => I.role === "packaging")
                              .map((I) =>
                                c.jsx(
                                  "option",
                                  { value: I.id, children: I.name },
                                  I.id,
                                ),
                              ),
                          ],
                        }),
                      }),
                      c.jsxs("div", {
                        className:
                          "flex items-center gap-1 bg-slate-50 px-3 py-2 rounded-2xl self-stretch lg:self-auto",
                        children: [
                          c.jsxs("div", {
                            className: "flex items-center gap-1.5",
                            children: [
                              c.jsx("span", {
                                className:
                                  "text-[10px] text-slate-400 font-black",
                                children: "من:",
                              }),
                              c.jsx("input", {
                                type: "date",
                                value: H,
                                onChange: (I) => je(I.target.value),
                                className:
                                  "bg-transparent border-none p-0 text-xs font-bold text-slate-700 outline-none w-28 focus:ring-0 text-right font-sans",
                              }),
                            ],
                          }),
                          c.jsx("div", {
                            className: "w-px h-4 bg-slate-200 mx-1",
                          }),
                          c.jsxs("div", {
                            className: "flex items-center gap-1.5",
                            children: [
                              c.jsx("span", {
                                className:
                                  "text-[10px] text-slate-400 font-black",
                                children: "إلى:",
                              }),
                              c.jsx("input", {
                                type: "date",
                                value: be,
                                onChange: (I) => J(I.target.value),
                                className:
                                  "bg-transparent border-none p-0 text-xs font-bold text-slate-700 outline-none w-28 focus:ring-0 text-right font-sans",
                              }),
                            ],
                          }),
                          (H || be) &&
                            c.jsx("button", {
                              onClick: () => {
                                (je(""), J(""));
                              },
                              className:
                                "text-xs font-black text-red-500 hover:text-red-700 mr-2 bg-red-50 px-2 py-0.5 rounded-lg",
                              children: "مسح ✕",
                            }),
                        ],
                      }),
                    ],
                  }),
                }),
                c.jsx("div", {
                  className: "flex justify-between items-center",
                  children: c.jsxs("h3", {
                    className:
                      "text-md font-black text-slate-800 flex items-center gap-2",
                    children: [
                      c.jsx(vc, { size: 18, className: "text-purple-500" }),
                      c.jsx("span", { children: "التغليف باليومية والتشطيب" }),
                    ],
                  }),
                }),
                c.jsx("div", {
                  className:
                    "bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm",
                  children: c.jsx("div", {
                    className: "overflow-x-auto",
                    children: c.jsxs("table", {
                      className: "w-full text-right border-collapse text-xs",
                      children: [
                        c.jsx("thead", {
                          children: c.jsxs("tr", {
                            className:
                              "bg-slate-50 text-slate-400 font-black border-b border-slate-100",
                            children: [
                              c.jsx("th", {
                                className: "p-4",
                                children: "رقم الكود",
                              }),
                              c.jsx("th", {
                                className: "p-4",
                                children: "تاريخ اليومية",
                              }),
                              c.jsx("th", {
                                className: "p-4",
                                children: "اسم العاملة",
                              }),
                              c.jsx("th", {
                                className: "p-4",
                                children: "الموديل المغلف",
                              }),
                              c.jsx("th", {
                                className: "p-4",
                                children: "اللون / المقاس",
                              }),
                              c.jsx("th", {
                                className: "p-4 text-center",
                                children: "القطع المغلفة",
                              }),
                              c.jsx("th", {
                                className:
                                  "p-4 text-left border-l border-slate-100",
                                children: "التكلفة",
                              }),
                              c.jsx("th", {
                                className: "p-4 text-center",
                                children: "إجراءات",
                              }),
                            ],
                          }),
                        }),
                        c.jsx("tbody", {
                          className:
                            "divide-y divide-slate-50 text-slate-700 font-bold",
                          children:
                            tl.length === 0
                              ? c.jsx("tr", {
                                  children: c.jsx("td", {
                                    colSpan: 8,
                                    className:
                                      "text-center p-12 text-slate-400",
                                    children:
                                      "لا يوجد بيانات تغليف مسجلة لهذا الأسبوع",
                                  }),
                                })
                              : tl.map((I) =>
                                  c.jsxs(
                                    "tr",
                                    {
                                      className: "hover:bg-slate-50/50",
                                      children: [
                                        c.jsx("td", {
                                          className:
                                            "p-4 font-mono text-slate-400",
                                          children: I.receiptId || "بدون",
                                        }),
                                        c.jsx("td", {
                                          className: "p-4",
                                          children: new Date(
                                            I.date,
                                          ).toLocaleDateString("ar-EG"),
                                        }),
                                        c.jsx("td", {
                                          className:
                                            "p-4 font-black text-purple-700",
                                          children: I.workerName,
                                        }),
                                        c.jsx("td", {
                                          className: "p-4",
                                          children: I.productName,
                                        }),
                                        c.jsxs("td", {
                                          className: "p-4",
                                          children: [I.color, " / ", I.size],
                                        }),
                                        c.jsxs("td", {
                                          className:
                                            "p-4 text-center font-black text-purple-600",
                                          children: [I.quantity, " قطعة"],
                                        }),
                                        c.jsxs("td", {
                                          className:
                                            "p-4 text-left font-black text-slate-950 border-l border-slate-50",
                                          children: [
                                            (I.totalCost || 0).toLocaleString(),
                                            " ج.م",
                                          ],
                                        }),
                                        c.jsx("td", {
                                          className: "p-4 text-center",
                                          children: c.jsxs("div", {
                                            className:
                                              "flex justify-center gap-1.5",
                                            children: [
                                              c.jsx("button", {
                                                onClick: () => Ur(I),
                                                className:
                                                  "p-1.5 hover:text-blue-600 hover:bg-blue-50 text-slate-400 rounded-lg transition-all",
                                                title: "تعديل السجل",
                                                children: c.jsx(Zu, {
                                                  size: 14,
                                                }),
                                              }),
                                              c.jsx("button", {
                                                onClick: () => mo(I.id),
                                                className:
                                                  "p-1.5 hover:text-red-600 hover:bg-red-50 text-slate-400 rounded-lg transition-all",
                                                title: "حذف السجل",
                                                children: c.jsx(gr, {
                                                  size: 14,
                                                }),
                                              }),
                                            ],
                                          }),
                                        }),
                                      ],
                                    },
                                    I.id,
                                  ),
                                ),
                        }),
                      ],
                    }),
                  }),
                }),
              ],
            }),
          c.jsx(MP, {
            isIntakeModalOpen: qe,
            setIsIntakeModalOpen: Ge,
            isPaymentModalOpen: st,
            setIsPaymentModalOpen: Qt,
            isWorkerModalOpen: Ue,
            setIsWorkerModalOpen: mt,
            isPackagingModalOpen: Sn,
            setIsPackagingModalOpen: zt,
            selectedStage: X,
            setSelectedStage: Se,
            intakeWorkerId: ke,
            setIntakeWorkerId: Ae,
            intakeDate: Ve,
            setIntakeDate: et,
            intakeItems: at,
            setIntakeItems: Ot,
            handleAddIntakeItem: Tf,
            handleRemoveIntakeItem: tr,
            handleRegisterIntake: xo,
            handlePayWorker: bo,
            paymentAmount: Gs,
            setPaymentAmount: Ws,
            paymentNote: Ys,
            setPaymentNote: Ea,
            payingWorkerId: co,
            setPayingWorkerId: Xs,
            workers: e,
            products: n,
            productionIntakes: a,
            newWorker: Kt,
            setNewWorker: si,
            handleCreateWorker: rl,
            pkgWorkerId: Ce,
            setPkgWorkerId: $t,
            pkgDate: Pt,
            setPkgDate: yt,
            pkgQuantity: Pn,
            setPkgQuantity: yr,
            pkgCostPerItem: oa,
            setPkgCostPerItem: Ht,
            handleRegisterPackaging: su,
          }),
          uo &&
            c.jsx("div", {
              className:
                "fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4",
              children: c.jsxs("div", {
                className:
                  "bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl text-right",
                children: [
                  c.jsxs("div", {
                    className:
                      "p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center text-right",
                    children: [
                      c.jsx("h3", {
                        className: "text-lg font-black text-slate-800",
                        children: "تعديل بيانات ورشة العمل / العامل",
                      }),
                      c.jsx("button", {
                        onClick: () => {
                          (Yi(!1), Js(null));
                        },
                        className:
                          "text-slate-400 font-bold hover:text-slate-600 p-1",
                        children: "✕",
                      }),
                    ],
                  }),
                  c.jsxs("form", {
                    onSubmit: iu,
                    className: "p-6 space-y-4 text-right",
                    children: [
                      c.jsxs("div", {
                        className: "space-y-1 text-right",
                        children: [
                          c.jsx("label", {
                            className:
                              "text-[10px] font-black text-slate-400 uppercase block text-right",
                            children: "اسم المصنع أو العامل القائم بالعمل",
                          }),
                          c.jsx("input", {
                            required: !0,
                            className:
                              "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold text-right outline-none",
                            value: fo,
                            onChange: (I) => ho(I.target.value),
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        className: "space-y-1 text-right",
                        children: [
                          c.jsx("label", {
                            className:
                              "text-[10px] font-black text-slate-400 uppercase block text-right",
                            children: "رقم الهاتف / التواصل",
                          }),
                          c.jsx("input", {
                            type: "text",
                            className:
                              "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold text-right outline-none",
                            value: zr,
                            onChange: (I) => en(I.target.value),
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        className: "space-y-1 text-right",
                        children: [
                          c.jsx("label", {
                            className:
                              "text-[10px] font-black text-slate-400 uppercase block text-right",
                            children: "الدور / المرحلة الأساسية",
                          }),
                          c.jsxs("select", {
                            required: !0,
                            className:
                              "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold text-right outline-none",
                            value: Nn,
                            onChange: (I) => Ta(I.target.value),
                            children: [
                              c.jsx("option", {
                                value: "cutting",
                                children: "🧵 قص",
                              }),
                              c.jsx("option", {
                                value: "sewing",
                                children: "🪡 تقفيل / خياطة",
                              }),
                              c.jsx("option", {
                                value: "packaging",
                                children: "📦 تغليف",
                              }),
                            ],
                          }),
                        ],
                      }),
                      c.jsx("button", {
                        type: "submit",
                        className:
                          "w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all mt-4",
                        children: "حفظ التعديلات",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          kf &&
            rn &&
            c.jsx("div", {
              className:
                "fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4",
              children: c.jsxs("div", {
                className:
                  "bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl text-right",
                children: [
                  c.jsxs("div", {
                    className:
                      "p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center text-right",
                    children: [
                      c.jsx("h3", {
                        className: "text-lg font-black text-slate-800",
                        children: "تعديل سجل الإنتاج 🛠️",
                      }),
                      c.jsx("button", {
                        onClick: () => {
                          (Zs(!1), po(null));
                        },
                        className:
                          "text-slate-400 font-bold hover:text-slate-600 p-1",
                        children: "✕",
                      }),
                    ],
                  }),
                  c.jsxs("form", {
                    onSubmit: oi,
                    className: "p-6 space-y-4 text-right",
                    children: [
                      c.jsxs("div", {
                        className: "space-y-1",
                        children: [
                          c.jsx("label", {
                            className:
                              "text-[10px] font-black text-slate-400 uppercase block text-right",
                            children: "تاريخ اليومية",
                          }),
                          c.jsx("input", {
                            type: "date",
                            required: !0,
                            className:
                              "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold text-right outline-none",
                            value: li,
                            onChange: (I) => Qs(I.target.value),
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        className: "space-y-1",
                        children: [
                          c.jsx("label", {
                            className:
                              "text-[10px] font-black text-slate-400 uppercase block text-right",
                            children: "الكمية المستلمة (قطع)",
                          }),
                          c.jsx("input", {
                            type: "number",
                            required: !0,
                            className:
                              "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-black font-sans text-right outline-none",
                            value: wr || "",
                            onChange: (I) => Ca(parseInt(I.target.value) || 0),
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        className: "space-y-1",
                        children: [
                          c.jsx("label", {
                            className:
                              "text-[10px] font-black text-slate-400 uppercase block text-right",
                            children: "سعر القطعة (ج.م)",
                          }),
                          c.jsx("input", {
                            type: "number",
                            step: "any",
                            required: !0,
                            className:
                              "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-black font-sans text-right outline-none",
                            value: $r || "",
                            onChange: (I) =>
                              Oa(parseFloat(I.target.value) || 0),
                          }),
                        ],
                      }),
                      wr > 0 &&
                        $r > 0 &&
                        c.jsxs("p", {
                          className:
                            "text-xs font-black text-blue-600 bg-blue-50 text-center py-2.5 rounded-xl border border-blue-50",
                          children: [
                            "التكلفة الإجمالية الجديدة: ",
                            (wr * $r).toLocaleString(),
                            " ج.م",
                          ],
                        }),
                      c.jsx("button", {
                        type: "submit",
                        className:
                          "w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-105 hover:bg-blue-700 transition-all mt-4",
                        children: "تأكيد حفظ التعديلات",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          Fe.isOpen &&
            c.jsx("div", {
              className:
                "fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4",
              children: c.jsxs("div", {
                className:
                  "bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl text-right animate-in zoom-in-95 duration-200",
                children: [
                  c.jsxs("div", {
                    className:
                      "p-6 bg-red-50 border-b border-red-100 flex justify-between items-center flex-row-reverse text-right",
                    children: [
                      c.jsx("h3", {
                        className: "text-lg font-black text-red-800",
                        children: Fe.title,
                      }),
                      c.jsx("button", {
                        onClick: () => rt((I) => ({ ...I, isOpen: !1 })),
                        className:
                          "text-red-400 font-bold hover:text-red-600 p-1",
                        children: "✕",
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "p-6 space-y-4 text-right",
                    children: [
                      c.jsx("p", {
                        className:
                          "text-sm font-bold text-slate-600 leading-relaxed text-right",
                        children: Fe.message,
                      }),
                      c.jsxs("div", {
                        className: "flex gap-3 mt-6",
                        children: [
                          c.jsx("button", {
                            type: "button",
                            onClick: () => {
                              (Fe.onConfirm(),
                                rt((I) => ({ ...I, isOpen: !1 })));
                            },
                            className:
                              "w-1/2 bg-red-600 text-white font-black py-3 rounded-2xl shadow-xl shadow-red-100 hover:bg-red-700 transition-all text-sm",
                            children: "نعم، تأكيد الحذف",
                          }),
                          c.jsx("button", {
                            type: "button",
                            onClick: () => rt((I) => ({ ...I, isOpen: !1 })),
                            className:
                              "w-1/2 bg-slate-100 text-slate-600 font-black py-3 rounded-2xl hover:bg-slate-200 transition-all text-sm",
                            children: "إلغاء",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
        ],
      });
}
function MP({
  isIntakeModalOpen: e,
  setIsIntakeModalOpen: t,
  isPaymentModalOpen: n,
  setIsPaymentModalOpen: r,
  isWorkerModalOpen: a,
  setIsWorkerModalOpen: s,
  isPackagingModalOpen: o,
  setIsPackagingModalOpen: u,
  selectedStage: f,
  setSelectedStage: h,
  intakeWorkerId: g,
  setIntakeWorkerId: m,
  intakeDate: v,
  setIntakeDate: b,
  intakeItems: w,
  setIntakeItems: N,
  handleAddIntakeItem: S,
  handleRemoveIntakeItem: k,
  handleRegisterIntake: E,
  handlePayWorker: A,
  paymentAmount: T,
  setPaymentAmount: P,
  paymentNote: C,
  setPaymentNote: D,
  payingWorkerId: O,
  setPayingWorkerId: L,
  workers: z,
  products: K,
  productionIntakes: q,
  newWorker: te,
  setNewWorker: xe,
  handleCreateWorker: ie,
  pkgWorkerId: B,
  setPkgWorkerId: se,
  pkgDate: ue,
  setPkgDate: ye,
  pkgQuantity: ne,
  setPkgQuantity: $,
  pkgCostPerItem: Y,
  setPkgCostPerItem: he,
  handleRegisterPackaging: oe,
}) {
  return c.jsxs(c.Fragment, {
    children: [
      e &&
        c.jsx("div", {
          className:
            "fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4",
          children: c.jsxs("div", {
            className:
              "bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]",
            children: [
              c.jsxs("div", {
                className:
                  "p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center text-right",
                children: [
                  c.jsx("h3", {
                    className: "text-xl font-black text-slate-800",
                    children: "تسجيل مرحلة إنتاج 🛠️",
                  }),
                  c.jsx("button", {
                    onClick: () => t(!1),
                    className:
                      "text-slate-400 font-bold hover:text-slate-600 p-2",
                    children: "✕",
                  }),
                ],
              }),
              c.jsxs("div", {
                className: "px-6 pt-4 bg-white",
                children: [
                  c.jsx("label", {
                    className:
                      "block text-right text-[10px] font-black text-slate-400 uppercase mb-1.5",
                    children: "اختر المرحلة المراد تسجيلها",
                  }),
                  c.jsx("div", {
                    className:
                      "flex bg-slate-100 p-1.5 rounded-2xl gap-1 justify-center",
                    children: ["cutting", "sewing", "packaging"].map((Z) => {
                      const H = f === Z;
                      return c.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            (h(Z),
                              Z === "packaging"
                                ? (se(g), ye(v), $(0), he(0))
                                : (m(B || g),
                                  b(ue || v),
                                  N([
                                    {
                                      productId: "",
                                      variantId: "",
                                      quantity: 0,
                                      costPerItem: 0,
                                      type: Z,
                                    },
                                  ])));
                          },
                          className: `flex-1 py-1.5 text-xs font-black rounded-xl transition-all ${H ? "bg-blue-600 text-white shadow-md font-black" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`,
                          children:
                            Z === "cutting"
                              ? "🧵 قص"
                              : Z === "sewing"
                                ? "🪡 تقفيل"
                                : "📦 تغليف",
                        },
                        Z,
                      );
                    }),
                  }),
                ],
              }),
              f !== "packaging"
                ? c.jsxs("form", {
                    onSubmit: E,
                    className:
                      "p-6 space-y-4 overflow-y-auto text-right flex-1",
                    children: [
                      c.jsxs("div", {
                        className: "grid grid-cols-2 gap-4",
                        children: [
                          c.jsxs("div", {
                            className: "space-y-1 text-right",
                            children: [
                              c.jsx("label", {
                                className:
                                  "text-[10px] font-black text-slate-400 uppercase",
                                children: "اسم العامل أو المصنع",
                              }),
                              c.jsxs("select", {
                                required: !0,
                                className:
                                  "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold text-right outline-none",
                                value: g,
                                onChange: (Z) => m(Z.target.value),
                                children: [
                                  c.jsx("option", {
                                    value: "",
                                    children: "اختر جهة الإنتاج الموردة...",
                                  }),
                                  z.map((Z) =>
                                    c.jsx(
                                      "option",
                                      { value: Z.id, children: Z.name },
                                      Z.id,
                                    ),
                                  ),
                                ],
                              }),
                            ],
                          }),
                          c.jsxs("div", {
                            className: "space-y-1 text-right",
                            children: [
                              c.jsx("label", {
                                className:
                                  "text-[10px] font-black text-slate-400 uppercase",
                                children: "التاريخ واليومية",
                              }),
                              c.jsx("input", {
                                type: "date",
                                required: !0,
                                className:
                                  "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold text-right outline-none",
                                value: v,
                                onChange: (Z) => b(Z.target.value),
                              }),
                            ],
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        className:
                          "bg-blue-50/45 p-5 rounded-[2rem] space-y-4 border border-blue-50",
                        children: [
                          c.jsxs("div", {
                            className: "flex justify-between items-center",
                            children: [
                              c.jsx("span", {
                                className:
                                  "text-xs font-black text-blue-600 uppercase",
                                children: "الموديلات الموردة وتفاصيل تشغيلها",
                              }),
                              c.jsx("div", {
                                className: "flex gap-1",
                                children: c.jsx("button", {
                                  type: "button",
                                  onClick: () => S(f),
                                  className: `p-2 px-3.5 rounded-xl text-xs font-black transition-all text-white ${f === "cutting" ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-600 hover:bg-blue-700"}`,
                                  children:
                                    f === "cutting"
                                      ? "+ إضافة قص 🧵"
                                      : "+ إضافة تقفيل 🪡",
                                }),
                              }),
                            ],
                          }),
                          c.jsx("div", {
                            className:
                              "space-y-4 max-h-[30vh] overflow-y-auto p-1",
                            children: w.map((Z, H) => {
                              var je;
                              return (
                                Z.type !== f && (Z.type = f),
                                c.jsxs(
                                  "div",
                                  {
                                    className:
                                      "bg-white p-4 rounded-2xl space-y-3 shadow-sm relative text-right border border-slate-50",
                                    children: [
                                      c.jsx("button", {
                                        type: "button",
                                        onClick: () => k(H),
                                        className:
                                          "absolute -top-2 -left-2 bg-red-100 text-red-600 p-1.5 rounded-full hover:bg-red-200 border border-red-200",
                                        children: c.jsx(Qn, { size: 14 }),
                                      }),
                                      c.jsxs("div", {
                                        className:
                                          "grid grid-cols-1 md:grid-cols-2 gap-3 text-right",
                                        children: [
                                          c.jsxs("div", {
                                            className: "space-y-1 text-right",
                                            children: [
                                              c.jsx("label", {
                                                className:
                                                  "text-[9px] font-black text-slate-400",
                                                children:
                                                  "المنتج / موديل الأطفال",
                                              }),
                                              c.jsxs("select", {
                                                required: !0,
                                                className:
                                                  "w-full bg-slate-50 border-none rounded-lg p-2 text-xs font-bold text-right outline-none",
                                                value: Z.productId,
                                                onChange: (be) => {
                                                  const J = [...w];
                                                  ((J[H].productId =
                                                    be.target.value),
                                                    (J[H].variantId = ""));
                                                  const me = K.find(
                                                    (Ie) =>
                                                      Ie.id === be.target.value,
                                                  );
                                                  (me &&
                                                    (J[H].costPerItem =
                                                      f === "cutting"
                                                        ? me.materialsCost || 0
                                                        : me.workshopFee || 0),
                                                    N(J));
                                                },
                                                children: [
                                                  c.jsx("option", {
                                                    value: "",
                                                    children: "اختر الموديل...",
                                                  }),
                                                  K.map((be) =>
                                                    c.jsxs(
                                                      "option",
                                                      {
                                                        value: be.id,
                                                        children: [
                                                          be.name,
                                                          " (",
                                                          be.code,
                                                          ")",
                                                        ],
                                                      },
                                                      be.id,
                                                    ),
                                                  ),
                                                ],
                                              }),
                                            ],
                                          }),
                                          c.jsxs("div", {
                                            className: "space-y-1 text-right",
                                            children: [
                                              c.jsx("label", {
                                                className:
                                                  "text-[9px] font-black text-slate-400",
                                                children:
                                                  "اللون / المقاس المتاح بالمخزن",
                                              }),
                                              c.jsxs("select", {
                                                required: !0,
                                                className:
                                                  "w-full bg-slate-50 border-none rounded-lg p-2 text-xs font-bold text-right outline-none",
                                                disabled: !Z.productId,
                                                value: Z.variantId,
                                                onChange: (be) => {
                                                  const J = [...w];
                                                  ((J[H].variantId =
                                                    be.target.value),
                                                    N(J));
                                                },
                                                children: [
                                                  c.jsx("option", {
                                                    value: "",
                                                    children:
                                                      "اختر متفرع اللون والمقاس...",
                                                  }),
                                                  (je = K.find(
                                                    (be) =>
                                                      be.id === Z.productId,
                                                  )) == null
                                                    ? void 0
                                                    : je.variants.map((be) =>
                                                        c.jsxs(
                                                          "option",
                                                          {
                                                            value: be.id,
                                                            children: [
                                                              be.color,
                                                              " - ",
                                                              be.size,
                                                            ],
                                                          },
                                                          be.id,
                                                        ),
                                                      ),
                                                ],
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      c.jsxs("div", {
                                        className: "grid grid-cols-2 gap-3",
                                        children: [
                                          c.jsxs("div", {
                                            className: "space-y-1 text-right",
                                            children: [
                                              c.jsx("label", {
                                                className:
                                                  "text-[9px] font-black text-slate-400",
                                                children:
                                                  "الكمية المسلمة (قطع)",
                                              }),
                                              c.jsx("input", {
                                                type: "number",
                                                required: !0,
                                                className:
                                                  "w-full bg-slate-50 border-none rounded-lg p-2 text-xs font-black text-right",
                                                value: Z.quantity || "",
                                                placeholder: "مثال 50",
                                                onFocus: (be) =>
                                                  be.target.select(),
                                                onChange: (be) => {
                                                  const J = [...w];
                                                  ((J[H].quantity =
                                                    parseInt(be.target.value) ||
                                                    0),
                                                    N(J));
                                                },
                                              }),
                                            ],
                                          }),
                                          c.jsxs("div", {
                                            className: "space-y-1 text-right",
                                            children: [
                                              c.jsx("label", {
                                                className:
                                                  "text-[9px] font-black text-slate-400",
                                                children:
                                                  "تسعيرة القطعة المستحقة للورشة",
                                              }),
                                              c.jsx("input", {
                                                type: "number",
                                                required: !0,
                                                className:
                                                  "w-full bg-slate-50 border-none rounded-lg p-2 text-xs font-black font-sans text-right outline-none",
                                                value: Z.costPerItem || "",
                                                placeholder: "ج.م للقطعة",
                                                onFocus: (be) =>
                                                  be.target.select(),
                                                onChange: (be) => {
                                                  const J = [...w];
                                                  ((J[H].costPerItem =
                                                    parseFloat(
                                                      be.target.value,
                                                    ) || 0),
                                                    N(J));
                                                },
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  },
                                  H,
                                )
                              );
                            }),
                          }),
                        ],
                      }),
                      c.jsx("button", {
                        className:
                          "w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all mt-4",
                        children:
                          "تأكيد التشغيل والإنتاج وإضافة لحسابات الورش 🧵🪡",
                      }),
                    ],
                  })
                : c.jsxs("form", {
                    onSubmit: oe,
                    className:
                      "p-6 space-y-4 overflow-y-auto text-right flex-1",
                    children: [
                      c.jsxs("div", {
                        className: "space-y-1 text-right",
                        children: [
                          c.jsx("label", {
                            className:
                              "text-[10px] font-black text-slate-400 uppercase",
                            children: "العاملة القائمة بالتغليف",
                          }),
                          c.jsxs("select", {
                            required: !0,
                            className:
                              "w-full bg-slate-50 border-none rounded-xl p-3 text-xs font-bold text-right outline-none",
                            value: B,
                            onChange: (Z) => se(Z.target.value),
                            children: [
                              c.jsx("option", {
                                value: "",
                                children: "اختر العاملة...",
                              }),
                              z.map((Z) =>
                                c.jsx(
                                  "option",
                                  { value: Z.id, children: Z.name },
                                  Z.id,
                                ),
                              ),
                            ],
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        className: "space-y-1 text-right",
                        children: [
                          c.jsx("label", {
                            className:
                              "text-[10px] font-black text-slate-400 uppercase",
                            children: "تاريخ يوم العمل",
                          }),
                          c.jsx("input", {
                            type: "date",
                            required: !0,
                            className:
                              "w-full bg-slate-50 border-none rounded-xl p-3 text-xs font-bold text-right outline-none",
                            value: ue,
                            onChange: (Z) => ye(Z.target.value),
                          }),
                        ],
                      }),
                      c.jsxs("div", {
                        className: "grid grid-cols-2 gap-4 col-span-2",
                        children: [
                          c.jsxs("div", {
                            className: "space-y-1 text-right",
                            children: [
                              c.jsx("label", {
                                className:
                                  "text-[10px] font-black text-slate-400",
                                children: "الكمية المغلفة (قطع)",
                              }),
                              c.jsx("input", {
                                type: "number",
                                required: !0,
                                className:
                                  "w-full bg-slate-50 border-none rounded-xl p-3 text-xs font-black font-sans text-right outline-none",
                                value: ne || "",
                                placeholder: "كم قطعة؟",
                                onFocus: (Z) => Z.target.select(),
                                onChange: (Z) =>
                                  $(parseInt(Z.target.value) || 0),
                              }),
                            ],
                          }),
                          c.jsxs("div", {
                            className: "space-y-1 text-right",
                            children: [
                              c.jsx("label", {
                                className:
                                  "text-[10px] font-black text-slate-400",
                                children: "سعر تغليف القطعة",
                              }),
                              c.jsx("input", {
                                type: "number",
                                required: !0,
                                className:
                                  "w-full bg-slate-50 border-none rounded-xl p-3 text-xs font-black font-sans text-right outline-none",
                                value: Y || "",
                                placeholder: "مثال: 5 ج.م",
                                onFocus: (Z) => Z.target.select(),
                                onChange: (Z) =>
                                  he(parseFloat(Z.target.value) || 0),
                              }),
                            ],
                          }),
                        ],
                      }),
                      ne > 0 &&
                        Y > 0 &&
                        c.jsxs("p", {
                          className:
                            "text-xs font-black text-purple-600 bg-purple-50 text-center py-2.5 rounded-xl border border-purple-100",
                          children: [
                            "إجمالي كلفة التغليف للدفعة: ",
                            (ne * Y).toLocaleString(),
                            " ج.م",
                          ],
                        }),
                      c.jsx("button", {
                        className:
                          "w-full bg-purple-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-purple-100 hover:bg-purple-700 transition-all mt-3",
                        children: "تأكيد التغليف والتسجيل لحساب العاملة 📦",
                      }),
                    ],
                  }),
            ],
          }),
        }),
      n &&
        c.jsx("div", {
          className:
            "fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4",
          children: c.jsxs("div", {
            className:
              "bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl text-right",
            children: [
              c.jsxs("div", {
                className:
                  "p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center text-right",
                children: [
                  c.jsx("h3", {
                    className: "text-lg font-black text-slate-800",
                    children: "تسجيل سلفة / دفعة تحت الحساب",
                  }),
                  c.jsx("button", {
                    onClick: () => r(!1),
                    className:
                      "text-slate-400 font-bold hover:text-slate-600 p-1",
                    children: "✕",
                  }),
                ],
              }),
              c.jsxs("form", {
                onSubmit: A,
                className: "p-6 space-y-4 text-right",
                children: [
                  c.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      c.jsx("label", {
                        className:
                          "text-[10px] font-black text-slate-400 uppercase block text-right",
                        children: "المستفيد المسجل",
                      }),
                      c.jsxs("select", {
                        required: !0,
                        className:
                          "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold text-right outline-none",
                        value: O,
                        onChange: (Z) => L(Z.target.value),
                        children: [
                          c.jsx("option", {
                            value: "",
                            children: "اختر العامل...",
                          }),
                          z.map((Z) =>
                            c.jsx(
                              "option",
                              { value: Z.id, children: Z.name },
                              Z.id,
                            ),
                          ),
                        ],
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      c.jsx("label", {
                        className:
                          "text-[10px] font-black text-slate-400 uppercase block text-right",
                        children: "مبلغ الدفعة / السلفة (ج.م)",
                      }),
                      c.jsx("input", {
                        type: "number",
                        required: !0,
                        className:
                          "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-black font-sans text-right outline-none",
                        value: T || "",
                        onFocus: (Z) => Z.target.select(),
                        onChange: (Z) => P(parseFloat(Z.target.value) || 0),
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      c.jsx("label", {
                        className:
                          "text-[10px] font-black text-slate-400 uppercase block text-right",
                        children: "ملاحظات (مثلاً: سلفة، دفعة مقدمة...)",
                      }),
                      c.jsx("textarea", {
                        className:
                          "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold text-right outline-none",
                        rows: 2,
                        placeholder:
                          "رقم المعاملة، شيك، دفعة تحت الحساب، إلخ...",
                        value: C,
                        onChange: (Z) => D(Z.target.value),
                      }),
                    ],
                  }),
                  c.jsx("button", {
                    type: "submit",
                    className:
                      "w-full bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all mt-2",
                    children: "تأكيد صرف السلفة / الدفعة تحت الحساب",
                  }),
                ],
              }),
            ],
          }),
        }),
      a &&
        c.jsx("div", {
          className:
            "fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4",
          children: c.jsxs("div", {
            className:
              "bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl text-right",
            children: [
              c.jsxs("div", {
                className:
                  "p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center text-right",
                children: [
                  c.jsx("h3", {
                    className: "text-lg font-black text-slate-800",
                    children: "إضافة مصنع أو ورشة جديدة",
                  }),
                  c.jsx("button", {
                    onClick: () => s(!1),
                    className:
                      "text-slate-400 font-bold hover:text-slate-600 p-1",
                    children: "✕",
                  }),
                ],
              }),
              c.jsxs("form", {
                onSubmit: ie,
                className: "p-6 space-y-4 text-right",
                children: [
                  c.jsxs("div", {
                    className: "space-y-1 text-right",
                    children: [
                      c.jsx("label", {
                        className:
                          "text-[10px] font-black text-slate-400 uppercase block text-right",
                        children: "اسم المصنع أو العامل القائم بالعمل",
                      }),
                      c.jsx("input", {
                        required: !0,
                        className:
                          "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold text-right outline-none",
                        placeholder: "مثال: ورشة الأمل للتطريز",
                        value: te.name || "",
                        onChange: (Z) => xe({ ...te, name: Z.target.value }),
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "space-y-1 text-right",
                    children: [
                      c.jsx("label", {
                        className:
                          "text-[10px] font-black text-slate-400 uppercase block text-right",
                        children: "رقم الهاتف / التواصل",
                      }),
                      c.jsx("input", {
                        type: "text",
                        placeholder: "مثال: 0100200300",
                        className:
                          "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold text-right outline-none",
                        value: te.phone || "",
                        onChange: (Z) => xe({ ...te, phone: Z.target.value }),
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "space-y-1 text-right",
                    children: [
                      c.jsx("label", {
                        className:
                          "text-[10px] font-black text-slate-400 uppercase block text-right",
                        children: "الدور / المرحلة الأساسية",
                      }),
                      c.jsxs("select", {
                        required: !0,
                        className:
                          "w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold text-right outline-none",
                        value: te.role || "cutting",
                        onChange: (Z) => xe({ ...te, role: Z.target.value }),
                        children: [
                          c.jsx("option", {
                            value: "cutting",
                            children: "🧵 قص",
                          }),
                          c.jsx("option", {
                            value: "sewing",
                            children: "🪡 تقفيل / خياطة",
                          }),
                          c.jsx("option", {
                            value: "packaging",
                            children: "📦 تغليف",
                          }),
                        ],
                      }),
                    ],
                  }),
                  c.jsx("button", {
                    type: "submit",
                    className:
                      "w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all mt-4",
                    children: "تأكيد تسجيل العامل كجهة إنتاج",
                  }),
                ],
              }),
            ],
          }),
        }),
    ],
  });
}
