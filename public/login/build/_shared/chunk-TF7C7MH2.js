import {
    a as Oe
} from "/build/_shared/chunk-KO3OK2JV.js";
import {
    b as Jt,
    e as Fe
} from "/build/_shared/chunk-ADMCF34Z.js";

function H() {
    return H = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
        }
        return e
    }, H.apply(this, arguments)
}

function Yr(e) {
    e === void 0 && (e = {});

    function t(n, a) {
        let {
            pathname: o,
            search: i,
            hash: l
        } = n.location;
        return lt("", {
            pathname: o,
            search: i,
            hash: l
        }, a.state && a.state.usr || null, a.state && a.state.key || "default")
    }

    function r(n, a) {
        return typeof a == "string" ? a : ue(a)
    }
    return ia(t, r, null, e)
}

function A(e, t) {
    if (e === !1 || e === null || typeof e > "u") throw new Error(t)
}

function We(e, t) {
    if (!e) {
        typeof console < "u" && console.warn(t);
        try {
            throw new Error(t)
        } catch {}
    }
}

function oa() {
    return Math.random().toString(36).substr(2, 8)
}

function Tr(e, t) {
    return {
        usr: e.state,
        key: e.key,
        idx: t
    }
}

function lt(e, t, r, n) {
    return r === void 0 && (r = null), H({
        pathname: typeof e == "string" ? e : e.pathname,
        search: "",
        hash: ""
    }, typeof t == "string" ? q(t) : t, {
        state: r,
        key: t && t.key || n || oa()
    })
}

function ue(e) {
    let {
        pathname: t = "/",
        search: r = "",
        hash: n = ""
    } = e;
    return r && r !== "?" && (t += r.charAt(0) === "?" ? r : "?" + r), n && n !== "#" && (t += n.charAt(0) === "#" ? n : "#" + n), t
}

function q(e) {
    let t = {};
    if (e) {
        let r = e.indexOf("#");
        r >= 0 && (t.hash = e.substr(r), e = e.substr(0, r));
        let n = e.indexOf("?");
        n >= 0 && (t.search = e.substr(n), e = e.substr(0, n)), e && (t.pathname = e)
    }
    return t
}

function ia(e, t, r, n) {
    n === void 0 && (n = {});
    let {
        window: a = document.defaultView,
        v5Compat: o = !1
    } = n, i = a.history, l = z.Pop, s = null, u = c();
    u == null && (u = 0, i.replaceState(H({}, i.state, {
        idx: u
    }), ""));

    function c() {
        return (i.state || {
            idx: null
        }).idx
    }

    function m() {
        l = z.Pop;
        let b = c(),
            _ = b == null ? null : b - u;
        u = b, s && s({
            action: l,
            location: E.location,
            delta: _
        })
    }

    function R(b, _) {
        l = z.Push;
        let O = lt(E.location, b, _);
        r && r(O, b), u = c() + 1;
        let D = Tr(O, u),
            d = E.createHref(O);
        try {
            i.pushState(D, "", d)
        } catch (C) {
            if (C instanceof DOMException && C.name === "DataCloneError") throw C;
            a.location.assign(d)
        }
        o && s && s({
            action: l,
            location: E.location,
            delta: 1
        })
    }

    function w(b, _) {
        l = z.Replace;
        let O = lt(E.location, b, _);
        r && r(O, b), u = c();
        let D = Tr(O, u),
            d = E.createHref(O);
        i.replaceState(D, "", d), o && s && s({
            action: l,
            location: E.location,
            delta: 0
        })
    }

    function v(b) {
        let _ = a.location.origin !== "null" ? a.location.origin : a.location.href,
            O = typeof b == "string" ? b : ue(b);
        return A(_, "No window.location.(origin|href) available to create URL for href: " + O), new URL(O, _)
    }
    let E = {
        get action() {
            return l
        },
        get location() {
            return e(a, i)
        },
        listen(b) {
            if (s) throw new Error("A history only accepts one active listener");
            return a.addEventListener(Ur, m), s = b, () => {
                a.removeEventListener(Ur, m), s = null
            }
        },
        createHref(b) {
            return t(a, b)
        },
        createURL: v,
        encodeLocation(b) {
            let _ = v(b);
            return {
                pathname: _.pathname,
                search: _.search,
                hash: _.hash
            }
        },
        push: R,
        replace: w,
        go(b) {
            return i.go(b)
        }
    };
    return E
}

function sa(e) {
    return e.index === !0
}

function Yt(e, t, r, n) {
    return r === void 0 && (r = []), n === void 0 && (n = {}), e.map((a, o) => {
        let i = [...r, o],
            l = typeof a.id == "string" ? a.id : i.join("-");
        if (A(a.index !== !0 || !a.children, "Cannot specify children on an index route"), A(!n[l], 'Found a route id collision on id "' + l + `".  Route id's must be globally unique within Data Router usages`), sa(a)) {
            let s = H({}, a, t(a), {
                id: l
            });
            return n[l] = s, s
        } else {
            let s = H({}, a, t(a), {
                id: l,
                children: void 0
            });
            return n[l] = s, a.children && (s.children = Yt(a.children, t, i, n)), s
        }
    })
}

function re(e, t, r) {
    r === void 0 && (r = "/");
    let n = typeof t == "string" ? q(t) : t,
        a = ve(n.pathname || "/", r);
    if (a == null) return null;
    let o = Gr(e);
    ua(o);
    let i = null;
    for (let l = 0; i == null && l < o.length; ++l) i = ga(o[l], Ea(a));
    return i
}

function Gr(e, t, r, n) {
    t === void 0 && (t = []), r === void 0 && (r = []), n === void 0 && (n = "");
    let a = (o, i, l) => {
        let s = {
            relativePath: l === void 0 ? o.path || "" : l,
            caseSensitive: o.caseSensitive === !0,
            childrenIndex: i,
            route: o
        };
        s.relativePath.startsWith("/") && (A(s.relativePath.startsWith(n), 'Absolute route path "' + s.relativePath + '" nested under path ' + ('"' + n + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), s.relativePath = s.relativePath.slice(n.length));
        let u = se([n, s.relativePath]),
            c = r.concat(s);
        o.children && o.children.length > 0 && (A(o.index !== !0, "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + u + '".')), Gr(o.children, t, c, u)), !(o.path == null && !o.index) && t.push({
            path: u,
            score: ya(u, o.index),
            routesMeta: c
        })
    };
    return e.forEach((o, i) => {
        var l;
        if (o.path === "" || !((l = o.path) != null && l.includes("?"))) a(o, i);
        else
            for (let s of Qr(o.path)) a(o, i, s)
    }), t
}

function Qr(e) {
    let t = e.split("/");
    if (t.length === 0) return [];
    let [r, ...n] = t, a = r.endsWith("?"), o = r.replace(/\?$/, "");
    if (n.length === 0) return a ? [o, ""] : [o];
    let i = Qr(n.join("/")),
        l = [];
    return l.push(...i.map(s => s === "" ? o : [o, s].join("/"))), a && l.push(...i), l.map(s => e.startsWith("/") && s === "" ? "/" : s)
}

function ua(e) {
    e.sort((t, r) => t.score !== r.score ? r.score - t.score : Ra(t.routesMeta.map(n => n.childrenIndex), r.routesMeta.map(n => n.childrenIndex)))
}

function ya(e, t) {
    let r = e.split("/"),
        n = r.length;
    return r.some(kr) && (n += pa), t && (n += fa), r.filter(a => !kr(a)).reduce((a, o) => a + (ca.test(o) ? da : o === "" ? ha : ma), n)
}

function Ra(e, t) {
    return e.length === t.length && e.slice(0, -1).every((n, a) => n === t[a]) ? e[e.length - 1] - t[t.length - 1] : 0
}

function ga(e, t) {
    let {
        routesMeta: r
    } = e, n = {}, a = "/", o = [];
    for (let i = 0; i < r.length; ++i) {
        let l = r[i],
            s = i === r.length - 1,
            u = a === "/" ? t : t.slice(a.length) || "/",
            c = st({
                path: l.relativePath,
                caseSensitive: l.caseSensitive,
                end: s
            }, u);
        if (!c) return null;
        Object.assign(n, c.params);
        let m = l.route;
        o.push({
            params: n,
            pathname: se([a, c.pathname]),
            pathnameBase: xa(se([a, c.pathnameBase])),
            route: m
        }), c.pathnameBase !== "/" && (a = se([a, c.pathnameBase]))
    }
    return o
}

function st(e, t) {
    typeof e == "string" && (e = {
        path: e,
        caseSensitive: !1,
        end: !0
    });
    let [r, n] = va(e.path, e.caseSensitive, e.end), a = t.match(r);
    if (!a) return null;
    let o = a[0],
        i = o.replace(/(.)\/+$/, "$1"),
        l = a.slice(1);
    return {
        params: n.reduce((u, c, m) => {
            if (c === "*") {
                let R = l[m] || "";
                i = o.slice(0, o.length - R.length).replace(/(.)\/+$/, "$1")
            }
            return u[c] = wa(l[m] || "", c), u
        }, {}),
        pathname: o,
        pathnameBase: i,
        pattern: e
    }
}

function va(e, t, r) {
    t === void 0 && (t = !1), r === void 0 && (r = !0), We(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
    let n = [],
        a = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/\/:(\w+)/g, (i, l) => (n.push(l), "/([^\\/]+)"));
    return e.endsWith("*") ? (n.push("*"), a += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? a += "\\/*$" : e !== "" && e !== "/" && (a += "(?:(?=\\/|$))"), [new RegExp(a, t ? void 0 : "i"), n]
}

function Ea(e) {
    try {
        return decodeURI(e)
    } catch (t) {
        return We(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")), e
    }
}

function wa(e, t) {
    try {
        return decodeURIComponent(e)
    } catch (r) {
        return We(!1, 'The value for the URL param "' + t + '" will not be decoded because' + (' the string "' + e + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + r + ").")), e
    }
}

function ve(e, t) {
    if (t === "/") return e;
    if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
    let r = t.endsWith("/") ? t.length - 1 : t.length,
        n = e.charAt(r);
    return n && n !== "/" ? null : e.slice(r) || "/"
}

function bt(e, t) {
    t === void 0 && (t = "/");
    let {
        pathname: r,
        search: n = "",
        hash: a = ""
    } = typeof e == "string" ? q(e) : e;
    return {
        pathname: r ? r.startsWith("/") ? r : ba(r, t) : t,
        search: Sa(n),
        hash: _a(a)
    }
}

function ba(e, t) {
    let r = t.replace(/\/+$/, "").split("/");
    return e.split("/").forEach(a => {
        a === ".." ? r.length > 1 && r.pop() : a !== "." && r.push(a)
    }), r.length > 1 ? r.join("/") : "/"
}

function Kt(e, t, r, n) {
    return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.'
}

function ut(e) {
    return e.filter((t, r) => r === 0 || t.route.path && t.route.path.length > 0)
}

function xt(e, t, r, n) {
    n === void 0 && (n = !1);
    let a;
    typeof e == "string" ? a = q(e) : (a = H({}, e), A(!a.pathname || !a.pathname.includes("?"), Kt("?", "pathname", "search", a)), A(!a.pathname || !a.pathname.includes("#"), Kt("#", "pathname", "hash", a)), A(!a.search || !a.search.includes("#"), Kt("#", "search", "hash", a)));
    let o = e === "" || a.pathname === "",
        i = o ? "/" : a.pathname,
        l;
    if (n || i == null) l = r;
    else {
        let m = t.length - 1;
        if (i.startsWith("..")) {
            let R = i.split("/");
            for (; R[0] === "..";) R.shift(), m -= 1;
            a.pathname = R.join("/")
        }
        l = m >= 0 ? t[m] : "/"
    }
    let s = bt(a, l),
        u = i && i !== "/" && i.endsWith("/"),
        c = (o || i === ".") && r.endsWith("/");
    return !s.pathname.endsWith("/") && (u || c) && (s.pathname += "/"), s
}

function Na(e) {
    return e instanceof Promise && e._tracked === !0
}

function Da(e) {
    if (!Na(e)) return e;
    if (e._error) throw e._error;
    return e._data
}

function he(e) {
    return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e
}

function qt(e) {
    let t = e.window ? e.window : typeof window < "u" ? window : void 0,
        r = typeof t < "u" && typeof t.document < "u" && typeof t.document.createElement < "u",
        n = !r;
    A(e.routes.length > 0, "You must provide a non-empty routes array to createRouter");
    let a;
    if (e.mapRouteProperties) a = e.mapRouteProperties;
    else if (e.detectErrorBoundary) {
        let f = e.detectErrorBoundary;
        a = h => ({
            hasErrorBoundary: f(h)
        })
    } else a = Oa;
    let o = {},
        i = Yt(e.routes, a, void 0, o),
        l, s = e.basename || "/",
        u = H({
            v7_normalizeFormMethod: !1,
            v7_prependBasename: !1
        }, e.future),
        c = null,
        m = new Set,
        R = null,
        w = null,
        v = null,
        E = e.hydrationData != null,
        b = re(i, e.history.location, s),
        _ = null;
    if (b == null) {
        let f = oe(404, {
                pathname: e.history.location.pathname
            }),
            {
                matches: h,
                route: p
            } = Wr(i);
        b = h, _ = {
            [p.id]: f
        }
    }
    let O = !b.some(f => f.route.lazy) && (!b.some(f => f.route.loader) || e.hydrationData != null),
        D, d = {
            historyAction: e.history.action,
            location: e.history.location,
            matches: b,
            initialized: O,
            navigation: Xt,
            restoreScrollPosition: e.hydrationData != null ? !1 : null,
            preventScrollReset: !1,
            revalidation: "idle",
            loaderData: e.hydrationData && e.hydrationData.loaderData || {},
            actionData: e.hydrationData && e.hydrationData.actionData || null,
            errors: e.hydrationData && e.hydrationData.errors || _,
            fetchers: new Map,
            blockers: new Map
        },
        C = z.Pop,
        T = !1,
        F, J = !1,
        te = !1,
        ae = [],
        Z = [],
        $ = new Map,
        yt = 0,
        Ze = -1,
        je = new Map,
        ye = new Set,
        Be = new Map,
        Le = new Map,
        Pe = new Map,
        kt = !1;

    function Wn() {
        return c = e.history.listen(f => {
            let {
                action: h,
                location: p,
                delta: x
            } = f;
            if (kt) {
                kt = !1;
                return
            }
            We(Pe.size === 0 || x != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
            let M = Mr({
                currentLocation: d.location,
                nextLocation: p,
                historyAction: h
            });
            if (M && x != null) {
                kt = !0, e.history.go(x * -1), gt(M, {
                    state: "blocked",
                    location: p,
                    proceed() {
                        gt(M, {
                            state: "proceeding",
                            proceed: void 0,
                            reset: void 0,
                            location: p
                        }), e.history.go(x)
                    },
                    reset() {
                        let L = new Map(d.blockers);
                        L.set(M, He), Y({
                            blockers: L
                        })
                    }
                });
                return
            }
            return be(h, p)
        }), d.initialized || be(z.Pop, d.location), D
    }

    function Jn() {
        c && c(), m.clear(), F && F.abort(), d.fetchers.forEach((f, h) => jt(h)), d.blockers.forEach((f, h) => Pr(h))
    }

    function Kn(f) {
        return m.add(f), () => m.delete(f)
    }

    function Y(f) {
        d = H({}, d, f), m.forEach(h => h(d))
    }

    function qe(f, h) {
        var p, x;
        let M = d.actionData != null && d.navigation.formMethod != null && le(d.navigation.formMethod) && d.navigation.state === "loading" && ((p = f.state) == null ? void 0 : p._isRedirect) !== !0,
            L;
        h.actionData ? Object.keys(h.actionData).length > 0 ? L = h.actionData : L = null : M ? L = d.actionData : L = null;
        let P = h.loaderData ? Vr(d.loaderData, h.loaderData, h.matches || [], h.errors) : d.loaderData,
            N = d.blockers;
        N.size > 0 && (N = new Map(N), N.forEach((B, Q) => N.set(Q, He)));
        let S = T === !0 || d.navigation.formMethod != null && le(d.navigation.formMethod) && ((x = f.state) == null ? void 0 : x._isRedirect) !== !0;
        l && (i = l, l = void 0), J || C === z.Pop || (C === z.Push ? e.history.push(f, f.state) : C === z.Replace && e.history.replace(f, f.state)), Y(H({}, h, {
            actionData: L,
            loaderData: P,
            historyAction: C,
            location: f,
            initialized: !0,
            navigation: Xt,
            revalidation: "idle",
            restoreScrollPosition: Fr(f, h.matches || d.matches),
            preventScrollReset: S,
            blockers: N
        })), C = z.Pop, T = !1, J = !1, te = !1, ae = [], Z = []
    }
    async function Sr(f, h) {
        if (typeof f == "number") {
            e.history.go(f);
            return
        }
        let p = Gt(d.location, d.matches, s, u.v7_prependBasename, f, h ? .fromRouteId, h ? .relative),
            {
                path: x,
                submission: M,
                error: L
            } = Ir(u.v7_normalizeFormMethod, !1, p, h),
            P = d.location,
            N = lt(d.location, x, h && h.state);
        N = H({}, N, e.history.encodeLocation(N));
        let S = h && h.replace != null ? h.replace : void 0,
            B = z.Push;
        S === !0 ? B = z.Replace : S === !1 || M != null && le(M.formMethod) && M.formAction === d.location.pathname + d.location.search && (B = z.Replace);
        let Q = h && "preventScrollReset" in h ? h.preventScrollReset === !0 : void 0,
            k = Mr({
                currentLocation: P,
                nextLocation: N,
                historyAction: B
            });
        if (k) {
            gt(k, {
                state: "blocked",
                location: N,
                proceed() {
                    gt(k, {
                        state: "proceeding",
                        proceed: void 0,
                        reset: void 0,
                        location: N
                    }), Sr(f, h)
                },
                reset() {
                    let W = new Map(d.blockers);
                    W.set(k, He), Y({
                        blockers: W
                    })
                }
            });
            return
        }
        return await be(B, N, {
            submission: M,
            pendingError: L,
            preventScrollReset: Q,
            replace: h && h.replace
        })
    }

    function Xn() {
        if (It(), Y({
                revalidation: "loading"
            }), d.navigation.state !== "submitting") {
            if (d.navigation.state === "idle") {
                be(d.historyAction, d.location, {
                    startUninterruptedRevalidation: !0
                });
                return
            }
            be(C || d.historyAction, d.navigation.location, {
                overrideNavigation: d.navigation
            })
        }
    }
    async function be(f, h, p) {
        F && F.abort(), F = null, C = f, J = (p && p.startUninterruptedRevalidation) === !0, ra(d.location, d.matches), T = (p && p.preventScrollReset) === !0;
        let x = l || i,
            M = p && p.overrideNavigation,
            L = re(x, h, s);
        if (!L) {
            let W = oe(404, {
                    pathname: h.pathname
                }),
                {
                    matches: G,
                    route: Me
                } = Wr(x);
            Bt(), qe(h, {
                matches: G,
                loaderData: {},
                errors: {
                    [Me.id]: W
                }
            });
            return
        }
        if (d.initialized && !te && ja(d.location, h) && !(p && p.submission && le(p.submission.formMethod))) {
            qe(h, {
                matches: L
            });
            return
        }
        F = new AbortController;
        let P = at(e.history, h, F.signal, p && p.submission),
            N, S;
        if (p && p.pendingError) S = {
            [ze(L).route.id]: p.pendingError
        };
        else if (p && p.submission && le(p.submission.formMethod)) {
            let W = await Yn(P, h, p.submission, L, {
                replace: p.replace
            });
            if (W.shortCircuited) return;
            N = W.pendingActionData, S = W.pendingActionError, M = Et(h, p.submission), P = new Request(P.url, {
                signal: P.signal
            })
        }
        let {
            shortCircuited: B,
            loaderData: Q,
            errors: k
        } = await Gn(P, h, L, M, p && p.submission, p && p.fetcherSubmission, p && p.replace, N, S);
        B || (F = null, qe(h, H({
            matches: L
        }, N ? {
            actionData: N
        } : {}, {
            loaderData: Q,
            errors: k
        })))
    }
    async function Yn(f, h, p, x, M) {
        M === void 0 && (M = {}), It();
        let L = Va(h, p);
        Y({
            navigation: L
        });
        let P, N = Zt(x, h);
        if (!N.route.action && !N.route.lazy) P = {
            type: X.error,
            error: oe(405, {
                method: f.method,
                pathname: h.pathname,
                routeId: N.route.id
            })
        };
        else if (P = await nt("action", f, N, x, o, a, s), f.signal.aborted) return {
            shortCircuited: !0
        };
        if (Ve(P)) {
            let S;
            return M && M.replace != null ? S = M.replace : S = P.location === d.location.pathname + d.location.search, await et(d, P, {
                submission: p,
                replace: S
            }), {
                shortCircuited: !0
            }
        }
        if (it(P)) {
            let S = ze(x, N.route.id);
            return (M && M.replace) !== !0 && (C = z.Push), {
                pendingActionData: {},
                pendingActionError: {
                    [S.route.id]: P.error
                }
            }
        }
        if (Ue(P)) throw oe(400, {
            type: "defer-action"
        });
        return {
            pendingActionData: {
                [N.route.id]: P.data
            }
        }
    }
    async function Gn(f, h, p, x, M, L, P, N, S) {
        let B = x || Et(h, M),
            Q = M || L || Xr(B),
            k = l || i,
            [W, G] = jr(e.history, d, p, Q, h, te, ae, Z, Be, ye, k, s, N, S);
        if (Bt(I => !(p && p.some(ie => ie.route.id === I)) || W && W.some(ie => ie.route.id === I)), Ze = ++yt, W.length === 0 && G.length === 0) {
            let I = Cr();
            return qe(h, H({
                matches: p,
                loaderData: {},
                errors: S || null
            }, N ? {
                actionData: N
            } : {}, I ? {
                fetchers: new Map(d.fetchers)
            } : {})), {
                shortCircuited: !0
            }
        }
        if (!J) {
            G.forEach(ie => {
                let Se = d.fetchers.get(ie.key),
                    Wt = ot(void 0, Se ? Se.data : void 0);
                d.fetchers.set(ie.key, Wt)
            });
            let I = N || d.actionData;
            Y(H({
                navigation: B
            }, I ? Object.keys(I).length === 0 ? {
                actionData: null
            } : {
                actionData: I
            } : {}, G.length > 0 ? {
                fetchers: new Map(d.fetchers)
            } : {}))
        }
        G.forEach(I => {
            $.has(I.key) && xe(I.key), I.controller && $.set(I.key, I.controller)
        });
        let Me = () => G.forEach(I => xe(I.key));
        F && F.signal.addEventListener("abort", Me);
        let {
            results: Ae,
            loaderResults: tt,
            fetcherResults: Ht
        } = await Nr(d.matches, p, W, G, f);
        if (f.signal.aborted) return {
            shortCircuited: !0
        };
        F && F.signal.removeEventListener("abort", Me), G.forEach(I => $.delete(I.key));
        let Re = Jr(Ae);
        if (Re) {
            if (Re.idx >= W.length) {
                let I = G[Re.idx - W.length].key;
                ye.add(I)
            }
            return await et(d, Re.result, {
                replace: P
            }), {
                shortCircuited: !0
            }
        }
        let {
            loaderData: ge,
            errors: vt
        } = zr(d, p, W, tt, S, G, Ht, Le);
        Le.forEach((I, ie) => {
            I.subscribe(Se => {
                (Se || I.done) && Le.delete(ie)
            })
        });
        let $t = Cr(),
            zt = Lr(Ze),
            Vt = $t || zt || G.length > 0;
        return H({
            loaderData: ge,
            errors: vt
        }, Vt ? {
            fetchers: new Map(d.fetchers)
        } : {})
    }

    function _r(f) {
        return d.fetchers.get(f) || Fa
    }

    function Qn(f, h, p, x) {
        if (n) throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
        $.has(f) && xe(f);
        let M = l || i,
            L = Gt(d.location, d.matches, s, u.v7_prependBasename, p, h, x ? .relative),
            P = re(M, L, s);
        if (!P) {
            Rt(f, h, oe(404, {
                pathname: L
            }));
            return
        }
        let {
            path: N,
            submission: S,
            error: B
        } = Ir(u.v7_normalizeFormMethod, !0, L, x);
        if (B) {
            Rt(f, h, B);
            return
        }
        let Q = Zt(P, N);
        if (T = (x && x.preventScrollReset) === !0, S && le(S.formMethod)) {
            Zn(f, h, N, Q, P, S);
            return
        }
        Be.set(f, {
            routeId: h,
            path: N
        }), qn(f, h, N, Q, P, S)
    }
    async function Zn(f, h, p, x, M, L) {
        if (It(), Be.delete(f), !x.route.action && !x.route.lazy) {
            let K = oe(405, {
                method: L.formMethod,
                pathname: p,
                routeId: h
            });
            Rt(f, h, K);
            return
        }
        let P = d.fetchers.get(f),
            N = Wa(L, P);
        d.fetchers.set(f, N), Y({
            fetchers: new Map(d.fetchers)
        });
        let S = new AbortController,
            B = at(e.history, p, S.signal, L);
        $.set(f, S);
        let Q = yt,
            k = await nt("action", B, x, M, o, a, s);
        if (B.signal.aborted) {
            $.get(f) === S && $.delete(f);
            return
        }
        if (Ve(k))
            if ($.delete(f), Ze > Q) {
                let K = $e(void 0);
                d.fetchers.set(f, K), Y({
                    fetchers: new Map(d.fetchers)
                });
                return
            } else {
                ye.add(f);
                let K = ot(L);
                return d.fetchers.set(f, K), Y({
                    fetchers: new Map(d.fetchers)
                }), et(d, k, {
                    submission: L,
                    isFetchActionRedirect: !0
                })
            }
        if (it(k)) {
            Rt(f, h, k.error);
            return
        }
        if (Ue(k)) throw oe(400, {
            type: "defer-action"
        });
        let W = d.navigation.location || d.location,
            G = at(e.history, W, S.signal),
            Me = l || i,
            Ae = d.navigation.state !== "idle" ? re(Me, d.navigation.location, s) : d.matches;
        A(Ae, "Didn't find any matches after fetcher action");
        let tt = ++yt;
        je.set(f, tt);
        let Ht = ot(L, k.data);
        d.fetchers.set(f, Ht);
        let [Re, ge] = jr(e.history, d, Ae, L, W, te, ae, Z, Be, ye, Me, s, {
            [x.route.id]: k.data
        }, void 0);
        ge.filter(K => K.key !== f).forEach(K => {
            let rt = K.key,
                Or = d.fetchers.get(rt),
                aa = ot(void 0, Or ? Or.data : void 0);
            d.fetchers.set(rt, aa), $.has(rt) && xe(rt), K.controller && $.set(rt, K.controller)
        }), Y({
            fetchers: new Map(d.fetchers)
        });
        let vt = () => ge.forEach(K => xe(K.key));
        S.signal.addEventListener("abort", vt);
        let {
            results: $t,
            loaderResults: zt,
            fetcherResults: Vt
        } = await Nr(d.matches, Ae, Re, ge, G);
        if (S.signal.aborted) return;
        S.signal.removeEventListener("abort", vt), je.delete(f), $.delete(f), ge.forEach(K => $.delete(K.key));
        let I = Jr($t);
        if (I) {
            if (I.idx >= Re.length) {
                let K = ge[I.idx - Re.length].key;
                ye.add(K)
            }
            return et(d, I.result)
        }
        let {
            loaderData: ie,
            errors: Se
        } = zr(d, d.matches, Re, zt, void 0, ge, Vt, Le);
        if (d.fetchers.has(f)) {
            let K = $e(k.data);
            d.fetchers.set(f, K)
        }
        let Wt = Lr(tt);
        d.navigation.state === "loading" && tt > Ze ? (A(C, "Expected pending action"), F && F.abort(), qe(d.navigation.location, {
            matches: Ae,
            loaderData: ie,
            errors: Se,
            fetchers: new Map(d.fetchers)
        })) : (Y(H({
            errors: Se,
            loaderData: Vr(d.loaderData, ie, Ae, Se)
        }, Wt || ge.length > 0 ? {
            fetchers: new Map(d.fetchers)
        } : {})), te = !1)
    }
    async function qn(f, h, p, x, M, L) {
        let P = d.fetchers.get(f),
            N = ot(L, P ? P.data : void 0);
        d.fetchers.set(f, N), Y({
            fetchers: new Map(d.fetchers)
        });
        let S = new AbortController,
            B = at(e.history, p, S.signal);
        $.set(f, S);
        let Q = yt,
            k = await nt("loader", B, x, M, o, a, s);
        if (Ue(k) && (k = await rn(k, B.signal, !0) || k), $.get(f) === S && $.delete(f), B.signal.aborted) return;
        if (Ve(k))
            if (Ze > Q) {
                let G = $e(void 0);
                d.fetchers.set(f, G), Y({
                    fetchers: new Map(d.fetchers)
                });
                return
            } else {
                ye.add(f), await et(d, k);
                return
            }
        if (it(k)) {
            let G = ze(d.matches, h);
            d.fetchers.delete(f), Y({
                fetchers: new Map(d.fetchers),
                errors: {
                    [G.route.id]: k.error
                }
            });
            return
        }
        A(!Ue(k), "Unhandled fetcher deferred data");
        let W = $e(k.data);
        d.fetchers.set(f, W), Y({
            fetchers: new Map(d.fetchers)
        })
    }
    async function et(f, h, p) {
        let {
            submission: x,
            replace: M,
            isFetchActionRedirect: L
        } = p === void 0 ? {} : p;
        h.revalidate && (te = !0);
        let P = lt(f.location, h.location, H({
            _isRedirect: !0
        }, L ? {
            _isFetchActionRedirect: !0
        } : {}));
        if (A(P, "Expected a location on the redirect navigation"), qr.test(h.location) && r) {
            let B = e.history.createURL(h.location),
                Q = ve(B.pathname, s) == null;
            if (t.location.origin !== B.origin || Q) {
                M ? t.location.replace(h.location) : t.location.assign(h.location);
                return
            }
        }
        F = null;
        let N = M === !0 ? z.Replace : z.Push,
            S = x || Xr(f.navigation);
        if (Aa.has(h.status) && S && le(S.formMethod)) await be(N, P, {
            submission: H({}, S, {
                formAction: h.location
            }),
            preventScrollReset: T
        });
        else if (L) await be(N, P, {
            overrideNavigation: Et(P),
            fetcherSubmission: S,
            preventScrollReset: T
        });
        else {
            let B = Et(P, S);
            await be(N, P, {
                overrideNavigation: B,
                preventScrollReset: T
            })
        }
    }
    async function Nr(f, h, p, x, M) {
        let L = await Promise.all([...p.map(S => nt("loader", M, S, h, o, a, s)), ...x.map(S => S.matches && S.match && S.controller ? nt("loader", at(e.history, S.path, S.controller.signal), S.match, S.matches, o, a, s) : {
                type: X.error,
                error: oe(404, {
                    pathname: S.path
                })
            })]),
            P = L.slice(0, p.length),
            N = L.slice(p.length);
        return await Promise.all([Kr(f, p, P, P.map(() => M.signal), !1, d.loaderData), Kr(f, x.map(S => S.match), N, x.map(S => S.controller ? S.controller.signal : null), !0)]), {
            results: L,
            loaderResults: P,
            fetcherResults: N
        }
    }

    function It() {
        te = !0, ae.push(...Bt()), Be.forEach((f, h) => {
            $.has(h) && (Z.push(h), xe(h))
        })
    }

    function Rt(f, h, p) {
        let x = ze(d.matches, h);
        jt(f), Y({
            errors: {
                [x.route.id]: p
            },
            fetchers: new Map(d.fetchers)
        })
    }

    function jt(f) {
        let h = d.fetchers.get(f);
        $.has(f) && !(h && h.state === "loading" && je.has(f)) && xe(f), Be.delete(f), je.delete(f), ye.delete(f), d.fetchers.delete(f)
    }

    function xe(f) {
        let h = $.get(f);
        A(h, "Expected fetch controller: " + f), h.abort(), $.delete(f)
    }

    function Dr(f) {
        for (let h of f) {
            let p = _r(h),
                x = $e(p.data);
            d.fetchers.set(h, x)
        }
    }

    function Cr() {
        let f = [],
            h = !1;
        for (let p of ye) {
            let x = d.fetchers.get(p);
            A(x, "Expected fetcher: " + p), x.state === "loading" && (ye.delete(p), f.push(p), h = !0)
        }
        return Dr(f), h
    }

    function Lr(f) {
        let h = [];
        for (let [p, x] of je)
            if (x < f) {
                let M = d.fetchers.get(p);
                A(M, "Expected fetcher: " + p), M.state === "loading" && (xe(p), je.delete(p), h.push(p))
            }
        return Dr(h), h.length > 0
    }

    function ea(f, h) {
        let p = d.blockers.get(f) || He;
        return Pe.get(f) !== h && Pe.set(f, h), p
    }

    function Pr(f) {
        d.blockers.delete(f), Pe.delete(f)
    }

    function gt(f, h) {
        let p = d.blockers.get(f) || He;
        A(p.state === "unblocked" && h.state === "blocked" || p.state === "blocked" && h.state === "blocked" || p.state === "blocked" && h.state === "proceeding" || p.state === "blocked" && h.state === "unblocked" || p.state === "proceeding" && h.state === "unblocked", "Invalid blocker state transition: " + p.state + " -> " + h.state);
        let x = new Map(d.blockers);
        x.set(f, h), Y({
            blockers: x
        })
    }

    function Mr(f) {
        let {
            currentLocation: h,
            nextLocation: p,
            historyAction: x
        } = f;
        if (Pe.size === 0) return;
        Pe.size > 1 && We(!1, "A router only supports one blocker at a time");
        let M = Array.from(Pe.entries()),
            [L, P] = M[M.length - 1],
            N = d.blockers.get(L);
        if (!(N && N.state === "proceeding") && P({
                currentLocation: h,
                nextLocation: p,
                historyAction: x
            })) return L
    }

    function Bt(f) {
        let h = [];
        return Le.forEach((p, x) => {
            (!f || f(x)) && (p.cancel(), h.push(x), Le.delete(x))
        }), h
    }

    function ta(f, h, p) {
        if (R = f, v = h, w = p || null, !E && d.navigation === Xt) {
            E = !0;
            let x = Fr(d.location, d.matches);
            x != null && Y({
                restoreScrollPosition: x
            })
        }
        return () => {
            R = null, v = null, w = null
        }
    }

    function Ar(f, h) {
        return w && w(f, h.map(x => za(x, d.loaderData))) || f.key
    }

    function ra(f, h) {
        if (R && v) {
            let p = Ar(f, h);
            R[p] = v()
        }
    }

    function Fr(f, h) {
        if (R) {
            let p = Ar(f, h),
                x = R[p];
            if (typeof x == "number") return x
        }
        return null
    }

    function na(f) {
        o = {}, l = Yt(f, a, void 0, o)
    }
    return D = {
        get basename() {
            return s
        },
        get state() {
            return d
        },
        get routes() {
            return i
        },
        initialize: Wn,
        subscribe: Kn,
        enableScrollRestoration: ta,
        navigate: Sr,
        fetch: Qn,
        revalidate: Xn,
        createHref: f => e.history.createHref(f),
        encodeLocation: f => e.history.encodeLocation(f),
        getFetcher: _r,
        deleteFetcher: jt,
        dispose: Jn,
        getBlocker: ea,
        deleteBlocker: Pr,
        _internalFetchControllers: $,
        _internalActiveDeferreds: Le,
        _internalSetRoutes: na
    }, D
}

function Ua(e) {
    return e != null && ("formData" in e && e.formData != null || "body" in e && e.body !== void 0)
}

function Gt(e, t, r, n, a, o, i) {
    let l, s;
    if (o != null && i !== "path") {
        l = [];
        for (let c of t)
            if (l.push(c), c.route.id === o) {
                s = c;
                break
            }
    } else l = t, s = t[t.length - 1];
    let u = xt(a || ".", ut(l).map(c => c.pathnameBase), ve(e.pathname, r) || e.pathname, i === "path");
    return a == null && (u.search = e.search, u.hash = e.hash), (a == null || a === "" || a === ".") && s && s.route.index && !er(u.search) && (u.search = u.search ? u.search.replace(/^\?/, "?index&") : "?index"), n && r !== "/" && (u.pathname = u.pathname === "/" ? r : se([r, u.pathname])), ue(u)
}

function Ir(e, t, r, n) {
    if (!n || !Ua(n)) return {
        path: r
    };
    if (n.formMethod && !$a(n.formMethod)) return {
        path: r,
        error: oe(405, {
            method: n.formMethod
        })
    };
    let a = () => ({
            path: r,
            error: oe(400, {
                type: "invalid-body"
            })
        }),
        o = n.formMethod || "get",
        i = e ? o.toUpperCase() : o.toLowerCase(),
        l = tn(r);
    if (n.body !== void 0) {
        if (n.formEncType === "text/plain") {
            if (!le(i)) return a();
            let R = typeof n.body == "string" ? n.body : n.body instanceof FormData || n.body instanceof URLSearchParams ? Array.from(n.body.entries()).reduce((w, v) => {
                let [E, b] = v;
                return "" + w + E + "=" + b + `
`
            }, "") : String(n.body);
            return {
                path: r,
                submission: {
                    formMethod: i,
                    formAction: l,
                    formEncType: n.formEncType,
                    formData: void 0,
                    json: void 0,
                    text: R
                }
            }
        } else if (n.formEncType === "application/json") {
            if (!le(i)) return a();
            try {
                let R = typeof n.body == "string" ? JSON.parse(n.body) : n.body;
                return {
                    path: r,
                    submission: {
                        formMethod: i,
                        formAction: l,
                        formEncType: n.formEncType,
                        formData: void 0,
                        json: R,
                        text: void 0
                    }
                }
            } catch {
                return a()
            }
        }
    }
    A(typeof FormData == "function", "FormData is not available in this environment");
    let s, u;
    if (n.formData) s = Qt(n.formData), u = n.formData;
    else if (n.body instanceof FormData) s = Qt(n.body), u = n.body;
    else if (n.body instanceof URLSearchParams) s = n.body, u = $r(s);
    else if (n.body == null) s = new URLSearchParams, u = new FormData;
    else try {
        s = new URLSearchParams(n.body), u = $r(s)
    } catch {
        return a()
    }
    let c = {
        formMethod: i,
        formAction: l,
        formEncType: n && n.formEncType || "application/x-www-form-urlencoded",
        formData: u,
        json: void 0,
        text: void 0
    };
    if (le(c.formMethod)) return {
        path: r,
        submission: c
    };
    let m = q(r);
    return t && m.search && er(m.search) && s.append("index", ""), m.search = "?" + s, {
        path: ue(m),
        submission: c
    }
}

function Ta(e, t) {
    let r = e;
    if (t) {
        let n = e.findIndex(a => a.route.id === t);
        n >= 0 && (r = e.slice(0, n))
    }
    return r
}

function jr(e, t, r, n, a, o, i, l, s, u, c, m, R, w) {
    let v = w ? Object.values(w)[0] : R ? Object.values(R)[0] : void 0,
        E = e.createURL(t.location),
        b = e.createURL(a),
        _ = w ? Object.keys(w)[0] : void 0,
        D = Ta(r, _).filter((C, T) => {
            if (C.route.lazy) return !0;
            if (C.route.loader == null) return !1;
            if (ka(t.loaderData, t.matches[T], C) || i.some(te => te === C.route.id)) return !0;
            let F = t.matches[T],
                J = C;
            return Br(C, H({
                currentUrl: E,
                currentParams: F.params,
                nextUrl: b,
                nextParams: J.params
            }, n, {
                actionResult: v,
                defaultShouldRevalidate: o || E.pathname + E.search === b.pathname + b.search || E.search !== b.search || en(F, J)
            }))
        }),
        d = [];
    return s.forEach((C, T) => {
        if (!r.some(Z => Z.route.id === C.routeId)) return;
        let F = re(c, C.path, m);
        if (!F) {
            d.push({
                key: T,
                routeId: C.routeId,
                path: C.path,
                matches: null,
                match: null,
                controller: null
            });
            return
        }
        let J = t.fetchers.get(T),
            te = Zt(F, C.path),
            ae = !1;
        u.has(T) ? ae = !1 : l.includes(T) ? ae = !0 : J && J.state !== "idle" && J.data === void 0 ? ae = o : ae = Br(te, H({
            currentUrl: E,
            currentParams: t.matches[t.matches.length - 1].params,
            nextUrl: b,
            nextParams: r[r.length - 1].params
        }, n, {
            actionResult: v,
            defaultShouldRevalidate: o
        })), ae && d.push({
            key: T,
            routeId: C.routeId,
            path: C.path,
            matches: F,
            match: te,
            controller: new AbortController
        })
    }), [D, d]
}

function ka(e, t, r) {
    let n = !t || r.route.id !== t.route.id,
        a = e[r.route.id] === void 0;
    return n || a
}

function en(e, t) {
    let r = e.route.path;
    return e.pathname !== t.pathname || r != null && r.endsWith("*") && e.params["*"] !== t.params["*"]
}

function Br(e, t) {
    if (e.route.shouldRevalidate) {
        let r = e.route.shouldRevalidate(t);
        if (typeof r == "boolean") return r
    }
    return t.defaultShouldRevalidate
}
async function Hr(e, t, r) {
    if (!e.lazy) return;
    let n = await e.lazy();
    if (!e.lazy) return;
    let a = r[e.id];
    A(a, "No route found in manifest");
    let o = {};
    for (let i in n) {
        let s = a[i] !== void 0 && i !== "hasErrorBoundary";
        We(!s, 'Route "' + a.id + '" has a static property "' + i + '" defined but its lazy function is also returning a value for this property. ' + ('The lazy route property "' + i + '" will be ignored.')), !s && !la.has(i) && (o[i] = n[i])
    }
    Object.assign(a, o), Object.assign(a, H({}, t(a), {
        lazy: void 0
    }))
}
async function nt(e, t, r, n, a, o, i, l) {
    l === void 0 && (l = {});
    let s, u, c, m = v => {
        let E, b = new Promise((_, O) => E = O);
        return c = () => E(), t.signal.addEventListener("abort", c), Promise.race([v({
            request: t,
            params: r.params,
            context: l.requestContext
        }), b])
    };
    try {
        let v = r.route[e];
        if (r.route.lazy)
            if (v) u = (await Promise.all([m(v), Hr(r.route, o, a)]))[0];
            else if (await Hr(r.route, o, a), v = r.route[e], v) u = await m(v);
        else if (e === "action") {
            let E = new URL(t.url),
                b = E.pathname + E.search;
            throw oe(405, {
                method: t.method,
                pathname: b,
                routeId: r.route.id
            })
        } else return {
            type: X.data,
            data: void 0
        };
        else if (v) u = await m(v);
        else {
            let E = new URL(t.url),
                b = E.pathname + E.search;
            throw oe(404, {
                pathname: b
            })
        }
        A(u !== void 0, "You defined " + (e === "action" ? "an action" : "a loader") + " for route " + ('"' + r.route.id + "\" but didn't return anything from your `" + e + "` ") + "function. Please return a value or `null`.")
    } catch (v) {
        s = X.error, u = v
    } finally {
        c && t.signal.removeEventListener("abort", c)
    }
    if (Ha(u)) {
        let v = u.status;
        if (Ma.has(v)) {
            let _ = u.headers.get("Location");
            if (A(_, "Redirects returned/thrown from loaders/actions must have a Location header"), !qr.test(_)) _ = Gt(new URL(t.url), n.slice(0, n.indexOf(r) + 1), i, !0, _);
            else if (!l.isStaticRequest) {
                let O = new URL(t.url),
                    D = _.startsWith("//") ? new URL(O.protocol + _) : new URL(_),
                    d = ve(D.pathname, i) != null;
                D.origin === O.origin && d && (_ = D.pathname + D.search + D.hash)
            }
            if (l.isStaticRequest) throw u.headers.set("Location", _), u;
            return {
                type: X.redirect,
                status: v,
                location: _,
                revalidate: u.headers.get("X-Remix-Revalidate") !== null
            }
        }
        if (l.isRouteRequest) throw {
            type: s || X.data,
            response: u
        };
        let E, b = u.headers.get("Content-Type");
        return b && /\bapplication\/json\b/.test(b) ? E = await u.json() : E = await u.text(), s === X.error ? {
            type: s,
            error: new _e(v, u.statusText, E),
            headers: u.headers
        } : {
            type: X.data,
            data: E,
            statusCode: u.status,
            headers: u.headers
        }
    }
    if (s === X.error) return {
        type: s,
        error: u
    };
    if (Ba(u)) {
        var R, w;
        return {
            type: X.deferred,
            deferredData: u,
            statusCode: (R = u.init) == null ? void 0 : R.status,
            headers: ((w = u.init) == null ? void 0 : w.headers) && new Headers(u.init.headers)
        }
    }
    return {
        type: X.data,
        data: u
    }
}

function at(e, t, r, n) {
    let a = e.createURL(tn(t)).toString(),
        o = {
            signal: r
        };
    if (n && le(n.formMethod)) {
        let {
            formMethod: i,
            formEncType: l
        } = n;
        o.method = i.toUpperCase(), l === "application/json" ? (o.headers = new Headers({
            "Content-Type": l
        }), o.body = JSON.stringify(n.json)) : l === "text/plain" ? o.body = n.text : l === "application/x-www-form-urlencoded" && n.formData ? o.body = Qt(n.formData) : o.body = n.formData
    }
    return new Request(a, o)
}

function Qt(e) {
    let t = new URLSearchParams;
    for (let [r, n] of e.entries()) t.append(r, typeof n == "string" ? n : n.name);
    return t
}

function $r(e) {
    let t = new FormData;
    for (let [r, n] of e.entries()) t.append(r, n);
    return t
}

function Ia(e, t, r, n, a) {
    let o = {},
        i = null,
        l, s = !1,
        u = {};
    return r.forEach((c, m) => {
        let R = t[m].route.id;
        if (A(!Ve(c), "Cannot handle redirect results in processLoaderData"), it(c)) {
            let w = ze(e, R),
                v = c.error;
            n && (v = Object.values(n)[0], n = void 0), i = i || {}, i[w.route.id] == null && (i[w.route.id] = v), o[R] = void 0, s || (s = !0, l = he(c.error) ? c.error.status : 500), c.headers && (u[R] = c.headers)
        } else Ue(c) ? (a.set(R, c.deferredData), o[R] = c.deferredData.data) : o[R] = c.data, c.statusCode != null && c.statusCode !== 200 && !s && (l = c.statusCode), c.headers && (u[R] = c.headers)
    }), n && (i = n, o[Object.keys(n)[0]] = void 0), {
        loaderData: o,
        errors: i,
        statusCode: l || 200,
        loaderHeaders: u
    }
}

function zr(e, t, r, n, a, o, i, l) {
    let {
        loaderData: s,
        errors: u
    } = Ia(t, r, n, a, l);
    for (let c = 0; c < o.length; c++) {
        let {
            key: m,
            match: R,
            controller: w
        } = o[c];
        A(i !== void 0 && i[c] !== void 0, "Did not find corresponding fetcher result");
        let v = i[c];
        if (!(w && w.signal.aborted))
            if (it(v)) {
                let E = ze(e.matches, R ? .route.id);
                u && u[E.route.id] || (u = H({}, u, {
                    [E.route.id]: v.error
                })), e.fetchers.delete(m)
            } else if (Ve(v)) A(!1, "Unhandled fetcher revalidation redirect");
        else if (Ue(v)) A(!1, "Unhandled fetcher deferred data");
        else {
            let E = $e(v.data);
            e.fetchers.set(m, E)
        }
    }
    return {
        loaderData: s,
        errors: u
    }
}

function Vr(e, t, r, n) {
    let a = H({}, t);
    for (let o of r) {
        let i = o.route.id;
        if (t.hasOwnProperty(i) ? t[i] !== void 0 && (a[i] = t[i]) : e[i] !== void 0 && o.route.loader && (a[i] = e[i]), n && n.hasOwnProperty(i)) break
    }
    return a
}

function ze(e, t) {
    return (t ? e.slice(0, e.findIndex(n => n.route.id === t) + 1) : [...e]).reverse().find(n => n.route.hasErrorBoundary === !0) || e[0]
}

function Wr(e) {
    let t = e.find(r => r.index || !r.path || r.path === "/") || {
        id: "__shim-error-route__"
    };
    return {
        matches: [{
            params: {},
            pathname: "",
            pathnameBase: "",
            route: t
        }],
        route: t
    }
}

function oe(e, t) {
    let {
        pathname: r,
        routeId: n,
        method: a,
        type: o
    } = t === void 0 ? {} : t, i = "Unknown Server Error", l = "Unknown @remix-run/router error";
    return e === 400 ? (i = "Bad Request", a && r && n ? l = "You made a " + a + ' request to "' + r + '" but ' + ('did not provide a `loader` for route "' + n + '", ') + "so there is no way to handle the request." : o === "defer-action" ? l = "defer() is not supported in actions" : o === "invalid-body" && (l = "Unable to encode submission body")) : e === 403 ? (i = "Forbidden", l = 'Route "' + n + '" does not match URL "' + r + '"') : e === 404 ? (i = "Not Found", l = 'No route matches URL "' + r + '"') : e === 405 && (i = "Method Not Allowed", a && r && n ? l = "You made a " + a.toUpperCase() + ' request to "' + r + '" but ' + ('did not provide an `action` for route "' + n + '", ') + "so there is no way to handle the request." : a && (l = 'Invalid request method "' + a.toUpperCase() + '"')), new _e(e || 500, i, new Error(l), !0)
}

function Jr(e) {
    for (let t = e.length - 1; t >= 0; t--) {
        let r = e[t];
        if (Ve(r)) return {
            result: r,
            idx: t
        }
    }
}

function tn(e) {
    let t = typeof e == "string" ? q(e) : e;
    return ue(H({}, t, {
        hash: ""
    }))
}

function ja(e, t) {
    return e.pathname !== t.pathname || e.search !== t.search ? !1 : e.hash === "" ? t.hash !== "" : e.hash === t.hash ? !0 : t.hash !== ""
}

function Ue(e) {
    return e.type === X.deferred
}

function it(e) {
    return e.type === X.error
}

function Ve(e) {
    return (e && e.type) === X.redirect
}

function Ba(e) {
    let t = e;
    return t && typeof t == "object" && typeof t.data == "object" && typeof t.subscribe == "function" && typeof t.cancel == "function" && typeof t.resolveData == "function"
}

function Ha(e) {
    return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body < "u"
}

function $a(e) {
    return Pa.has(e.toLowerCase())
}

function le(e) {
    return Ca.has(e.toLowerCase())
}
async function Kr(e, t, r, n, a, o) {
    for (let i = 0; i < r.length; i++) {
        let l = r[i],
            s = t[i];
        if (!s) continue;
        let u = e.find(m => m.route.id === s.route.id),
            c = u != null && !en(u, s) && (o && o[s.route.id]) !== void 0;
        if (Ue(l) && (a || c)) {
            let m = n[i];
            A(m, "Expected an AbortSignal for revalidating fetcher deferred result"), await rn(l, m, a).then(R => {
                R && (r[i] = R || r[i])
            })
        }
    }
}
async function rn(e, t, r) {
    if (r === void 0 && (r = !1), !await e.deferredData.resolveData(t)) {
        if (r) try {
            return {
                type: X.data,
                data: e.deferredData.unwrappedData
            }
        } catch (a) {
            return {
                type: X.error,
                error: a
            }
        }
        return {
            type: X.data,
            data: e.deferredData.data
        }
    }
}

function er(e) {
    return new URLSearchParams(e).getAll("index").some(t => t === "")
}

function za(e, t) {
    let {
        route: r,
        pathname: n,
        params: a
    } = e;
    return {
        id: r.id,
        pathname: n,
        params: a,
        data: t[r.id],
        handle: r.handle
    }
}

function Zt(e, t) {
    let r = typeof t == "string" ? q(t).search : t.search;
    if (e[e.length - 1].route.index && er(r || "")) return e[e.length - 1];
    let n = ut(e);
    return n[n.length - 1]
}

function Xr(e) {
    let {
        formMethod: t,
        formAction: r,
        formEncType: n,
        text: a,
        formData: o,
        json: i
    } = e;
    if (!(!t || !r || !n)) {
        if (a != null) return {
            formMethod: t,
            formAction: r,
            formEncType: n,
            formData: void 0,
            json: void 0,
            text: a
        };
        if (o != null) return {
            formMethod: t,
            formAction: r,
            formEncType: n,
            formData: o,
            json: void 0,
            text: void 0
        };
        if (i !== void 0) return {
            formMethod: t,
            formAction: r,
            formEncType: n,
            formData: void 0,
            json: i,
            text: void 0
        }
    }
}

function Et(e, t) {
    return t ? {
        state: "loading",
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text
    } : {
        state: "loading",
        location: e,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0
    }
}

function Va(e, t) {
    return {
        state: "submitting",
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text
    }
}

function ot(e, t) {
    return e ? {
        state: "loading",
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t,
        " _hasFetcherDoneAnything ": !0
    } : {
        state: "loading",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: t,
        " _hasFetcherDoneAnything ": !0
    }
}

function Wa(e, t) {
    return {
        state: "submitting",
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t ? t.data : void 0,
        " _hasFetcherDoneAnything ": !0
    }
}

function $e(e) {
    return {
        state: "idle",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: e,
        " _hasFetcherDoneAnything ": !0
    }
}
var z, Ur, X, la, ca, da, fa, ha, ma, pa, kr, se, xa, Sa, _a, fe, wt, St, _e, Zr, Ca, La, Pa, Ma, Aa, Xt, Fa, He, qr, Oa, li, Je = Jt(() => {
    (function(e) {
        e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE"
    })(z || (z = {}));
    Ur = "popstate";
    (function(e) {
        e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error"
    })(X || (X = {}));
    la = new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
    ca = /^:\w+$/, da = 3, fa = 2, ha = 1, ma = 10, pa = -2, kr = e => e === "*";
    se = e => e.join("/").replace(/\/\/+/g, "/"), xa = e => e.replace(/\/+$/, "").replace(/^\/*/, "/"), Sa = e => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, _a = e => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, fe = class extends Error {}, wt = class {
        constructor(t, r) {
            this.pendingKeysSet = new Set, this.subscribers = new Set, this.deferredKeys = [], A(t && typeof t == "object" && !Array.isArray(t), "defer() only accepts plain objects");
            let n;
            this.abortPromise = new Promise((o, i) => n = i), this.controller = new AbortController;
            let a = () => n(new fe("Deferred data aborted"));
            this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", a), this.controller.signal.addEventListener("abort", a), this.data = Object.entries(t).reduce((o, i) => {
                let [l, s] = i;
                return Object.assign(o, {
                    [l]: this.trackPromise(l, s)
                })
            }, {}), this.done && this.unlistenAbortSignal(), this.init = r
        }
        trackPromise(t, r) {
            if (!(r instanceof Promise)) return r;
            this.deferredKeys.push(t), this.pendingKeysSet.add(t);
            let n = Promise.race([r, this.abortPromise]).then(a => this.onSettle(n, t, void 0, a), a => this.onSettle(n, t, a));
            return n.catch(() => {}), Object.defineProperty(n, "_tracked", {
                get: () => !0
            }), n
        }
        onSettle(t, r, n, a) {
            if (this.controller.signal.aborted && n instanceof fe) return this.unlistenAbortSignal(), Object.defineProperty(t, "_error", {
                get: () => n
            }), Promise.reject(n);
            if (this.pendingKeysSet.delete(r), this.done && this.unlistenAbortSignal(), n === void 0 && a === void 0) {
                let o = new Error('Deferred data for key "' + r + '" resolved/rejected with `undefined`, you must resolve/reject with a value or `null`.');
                return Object.defineProperty(t, "_error", {
                    get: () => o
                }), this.emit(!1, r), Promise.reject(o)
            }
            return a === void 0 ? (Object.defineProperty(t, "_error", {
                get: () => n
            }), this.emit(!1, r), Promise.reject(n)) : (Object.defineProperty(t, "_data", {
                get: () => a
            }), this.emit(!1, r), a)
        }
        emit(t, r) {
            this.subscribers.forEach(n => n(t, r))
        }
        subscribe(t) {
            return this.subscribers.add(t), () => this.subscribers.delete(t)
        }
        cancel() {
            this.controller.abort(), this.pendingKeysSet.forEach((t, r) => this.pendingKeysSet.delete(r)), this.emit(!0)
        }
        async resolveData(t) {
            let r = !1;
            if (!this.done) {
                let n = () => this.cancel();
                t.addEventListener("abort", n), r = await new Promise(a => {
                    this.subscribe(o => {
                        t.removeEventListener("abort", n), (o || this.done) && a(o)
                    })
                })
            }
            return r
        }
        get done() {
            return this.pendingKeysSet.size === 0
        }
        get unwrappedData() {
            return A(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds"), Object.entries(this.data).reduce((t, r) => {
                let [n, a] = r;
                return Object.assign(t, {
                    [n]: Da(a)
                })
            }, {})
        }
        get pendingKeys() {
            return Array.from(this.pendingKeysSet)
        }
    };
    St = function(t, r) {
        r === void 0 && (r = 302);
        let n = r;
        typeof n == "number" ? n = {
            status: n
        } : typeof n.status > "u" && (n.status = 302);
        let a = new Headers(n.headers);
        return a.set("Location", t), new Response(null, H({}, n, {
            headers: a
        }))
    }, _e = class {
        constructor(t, r, n, a) {
            a === void 0 && (a = !1), this.status = t, this.statusText = r || "", this.internal = a, n instanceof Error ? (this.data = n.toString(), this.error = n) : this.data = n
        }
    };
    Zr = ["post", "put", "patch", "delete"], Ca = new Set(Zr), La = ["get", ...Zr], Pa = new Set(La), Ma = new Set([301, 302, 303, 307, 308]), Aa = new Set([307, 308]), Xt = {
        state: "idle",
        location: void 0,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0
    }, Fa = {
        state: "idle",
        data: void 0,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0
    }, He = {
        state: "unblocked",
        proceed: void 0,
        reset: void 0,
        location: void 0
    }, qr = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Oa = e => ({
        hasErrorBoundary: Boolean(e.hasErrorBoundary)
    });
    li = Symbol("deferred")
});

function _t() {
    return _t = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
        }
        return e
    }, _t.apply(this, arguments)
}

function Te(e, t) {
    let {
        relative: r
    } = t === void 0 ? {} : t;
    Ke() || A(!1);
    let {
        basename: n,
        navigator: a
    } = g.useContext(me), {
        hash: o,
        pathname: i,
        search: l
    } = Xe(e, {
        relative: r
    }), s = i;
    return n !== "/" && (s = i === "/" ? n : se([n, i])), a.createHref({
        pathname: s,
        search: l,
        hash: o
    })
}

function Ke() {
    return g.useContext(ct) != null
}

function ee() {
    return Ke() || A(!1), g.useContext(ct).location
}

function ln(e) {
    g.useContext(me).static || g.useLayoutEffect(e)
}

function Dt() {
    let {
        isDataRoute: e
    } = g.useContext(ce);
    return e ? no() : Xa()
}

function Xa() {
    Ke() || A(!1);
    let e = g.useContext(we),
        {
            basename: t,
            navigator: r
        } = g.useContext(me),
        {
            matches: n
        } = g.useContext(ce),
        {
            pathname: a
        } = ee(),
        o = JSON.stringify(ut(n).map(s => s.pathnameBase)),
        i = g.useRef(!1);
    return ln(() => {
        i.current = !0
    }), g.useCallback(function(s, u) {
        if (u === void 0 && (u = {}), !i.current) return;
        if (typeof s == "number") {
            r.go(s);
            return
        }
        let c = xt(s, JSON.parse(o), a, u.relative === "path");
        e == null && t !== "/" && (c.pathname = c.pathname === "/" ? t : se([t, c.pathname])), (u.replace ? r.replace : r.push)(c, u.state, u)
    }, [t, r, o, a, e])
}

function ar(e) {
    let t = g.useContext(ce).outlet;
    return t && g.createElement(Ya.Provider, {
        value: e
    }, t)
}

function sn() {
    let {
        matches: e
    } = g.useContext(ce), t = e[e.length - 1];
    return t ? t.params : {}
}

function Xe(e, t) {
    let {
        relative: r
    } = t === void 0 ? {} : t, {
        matches: n
    } = g.useContext(ce), {
        pathname: a
    } = ee(), o = JSON.stringify(ut(n).map(i => i.pathnameBase));
    return g.useMemo(() => xt(e, JSON.parse(o), a, r === "path"), [e, o, a, r])
}

function Ga(e, t, r) {
    Ke() || A(!1);
    let {
        navigator: n
    } = g.useContext(me), {
        matches: a
    } = g.useContext(ce), o = a[a.length - 1], i = o ? o.params : {}, l = o ? o.pathname : "/", s = o ? o.pathnameBase : "/", u = o && o.route, c = ee(), m;
    if (t) {
        var R;
        let _ = typeof t == "string" ? q(t) : t;
        s === "/" || (R = _.pathname) != null && R.startsWith(s) || A(!1), m = _
    } else m = c;
    let w = m.pathname || "/",
        v = s === "/" ? w : w.slice(s.length) || "/",
        E = re(e, {
            pathname: v
        }),
        b = eo(E && E.map(_ => Object.assign({}, _, {
            params: Object.assign({}, i, _.params),
            pathname: se([s, n.encodeLocation ? n.encodeLocation(_.pathname).pathname : _.pathname]),
            pathnameBase: _.pathnameBase === "/" ? s : se([s, n.encodeLocation ? n.encodeLocation(_.pathnameBase).pathname : _.pathnameBase])
        })), a, r);
    return t && b ? g.createElement(ct.Provider, {
        value: {
            location: _t({
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default"
            }, m),
            navigationType: z.Pop
        }
    }, b) : b
}

function Qa() {
    let e = ke(),
        t = he(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e),
        r = e instanceof Error ? e.stack : null,
        n = "rgba(200,200,200, 0.5)",
        a = {
            padding: "0.5rem",
            backgroundColor: n
        },
        o = {
            padding: "2px 4px",
            backgroundColor: n
        };
    return g.createElement(g.Fragment, null, g.createElement("h2", null, "Unexpected Application Error!"), g.createElement("h3", {
        style: {
            fontStyle: "italic"
        }
    }, t), r ? g.createElement("pre", {
        style: a
    }, r) : null, null)
}

function qa(e) {
    let {
        routeContext: t,
        match: r,
        children: n
    } = e, a = g.useContext(we);
    return a && a.static && a.staticContext && (r.route.errorElement || r.route.ErrorBoundary) && (a.staticContext._deepestRenderedBoundaryId = r.route.id), g.createElement(ce.Provider, {
        value: t
    }, n)
}

function eo(e, t, r) {
    var n;
    if (t === void 0 && (t = []), r === void 0 && (r = null), e == null) {
        var a;
        if ((a = r) != null && a.errors) e = r.matches;
        else return null
    }
    let o = e,
        i = (n = r) == null ? void 0 : n.errors;
    if (i != null) {
        let l = o.findIndex(s => s.route.id && i ? .[s.route.id]);
        l >= 0 || A(!1), o = o.slice(0, Math.min(o.length, l + 1))
    }
    return o.reduceRight((l, s, u) => {
        let c = s.route.id ? i ? .[s.route.id] : null,
            m = null;
        r && (m = s.route.errorElement || Za);
        let R = t.concat(o.slice(0, u + 1)),
            w = () => {
                let v;
                return c ? v = m : s.route.Component ? v = g.createElement(s.route.Component, null) : s.route.element ? v = s.route.element : v = l, g.createElement(qa, {
                    match: s,
                    routeContext: {
                        outlet: l,
                        matches: R,
                        isDataRoute: r != null
                    },
                    children: v
                })
            };
        return r && (s.route.ErrorBoundary || s.route.errorElement || u === 0) ? g.createElement(tr, {
            location: r.location,
            revalidation: r.revalidation,
            component: m,
            error: c,
            children: w(),
            routeContext: {
                outlet: null,
                matches: R,
                isDataRoute: !0
            }
        }) : w()
    }, null)
}

function to(e) {
    let t = g.useContext(we);
    return t || A(!1), t
}

function Ct(e) {
    let t = g.useContext(Ne);
    return t || A(!1), t
}

function ro(e) {
    let t = g.useContext(ce);
    return t || A(!1), t
}

function or(e) {
    let t = ro(e),
        r = t.matches[t.matches.length - 1];
    return r.route.id || A(!1), r.route.id
}

function Ye() {
    return Ct(Ee.UseNavigation).navigation
}

function dt() {
    let {
        matches: e,
        loaderData: t
    } = Ct(Ee.UseMatches);
    return g.useMemo(() => e.map(r => {
        let {
            pathname: n,
            params: a
        } = r;
        return {
            id: r.route.id,
            pathname: n,
            params: a,
            data: t[r.route.id],
            handle: r.route.handle
        }
    }), [e, t])
}

function ir() {
    let e = Ct(Ee.UseLoaderData),
        t = or(Ee.UseLoaderData);
    if (e.errors && e.errors[t] != null) {
        console.error("You cannot `useLoaderData` in an errorElement (routeId: " + t + ")");
        return
    }
    return e.loaderData[t]
}

function ke() {
    var e;
    let t = g.useContext(on),
        r = Ct(Ee.UseRouteError),
        n = or(Ee.UseRouteError);
    return t || ((e = r.errors) == null ? void 0 : e[n])
}

function lr() {
    let e = g.useContext(Nt);
    return e ? ._data
}

function Lt() {
    let e = g.useContext(Nt);
    return e ? ._error
}

function no() {
    let {
        router: e
    } = to(rr.UseNavigateStable), t = or(Ee.UseNavigateStable), r = g.useRef(!1);
    return ln(() => {
        r.current = !0
    }), g.useCallback(function(a, o) {
        o === void 0 && (o = {}), r.current && (typeof a == "number" ? e.navigate(a) : e.navigate(a, _t({
            fromRouteId: t
        }, o)))
    }, [e, t])
}

function sr(e) {
    let {
        fallbackElement: t,
        router: r,
        future: n
    } = e, [a, o] = g.useState(r.state), {
        v7_startTransition: i
    } = n || {}, l = g.useCallback(m => {
        i && nn ? nn(() => o(m)) : o(m)
    }, [o, i]);
    g.useLayoutEffect(() => r.subscribe(l), [r, l]);
    let s = g.useMemo(() => ({
            createHref: r.createHref,
            encodeLocation: r.encodeLocation,
            go: m => r.navigate(m),
            push: (m, R, w) => r.navigate(m, {
                state: R,
                preventScrollReset: w ? .preventScrollReset
            }),
            replace: (m, R, w) => r.navigate(m, {
                replace: !0,
                state: R,
                preventScrollReset: w ? .preventScrollReset
            })
        }), [r]),
        u = r.basename || "/",
        c = g.useMemo(() => ({
            router: r,
            navigator: s,
            static: !1,
            basename: u
        }), [r, s, u]);
    return g.createElement(g.Fragment, null, g.createElement(we.Provider, {
        value: c
    }, g.createElement(Ne.Provider, {
        value: a
    }, g.createElement(ur, {
        basename: u,
        location: a.location,
        navigationType: a.historyAction,
        navigator: s
    }, a.initialized ? g.createElement(oo, {
        routes: r.routes,
        state: a
    }) : t))), null)
}

function oo(e) {
    let {
        routes: t,
        state: r
    } = e;
    return Ga(t, void 0, r)
}

function Pt(e) {
    return ar(e.context)
}

function ur(e) {
    let {
        basename: t = "/",
        children: r = null,
        location: n,
        navigationType: a = z.Pop,
        navigator: o,
        static: i = !1
    } = e;
    Ke() && A(!1);
    let l = t.replace(/^\/*/, "/"),
        s = g.useMemo(() => ({
            basename: l,
            navigator: o,
            static: i
        }), [l, o, i]);
    typeof n == "string" && (n = q(n));
    let {
        pathname: u = "/",
        search: c = "",
        hash: m = "",
        state: R = null,
        key: w = "default"
    } = n, v = g.useMemo(() => {
        let E = ve(u, l);
        return E == null ? null : {
            location: {
                pathname: E,
                search: c,
                hash: m,
                state: R,
                key: w
            },
            navigationType: a
        }
    }, [l, u, c, m, R, w, a]);
    return v == null ? null : g.createElement(me.Provider, {
        value: s
    }, g.createElement(ct.Provider, {
        children: r,
        value: v
    }))
}

function cr(e) {
    let {
        children: t,
        errorElement: r,
        resolve: n
    } = e;
    return g.createElement(nr, {
        resolve: n,
        errorElement: r
    }, g.createElement(lo, null, t))
}

function lo(e) {
    let {
        children: t
    } = e, r = lr(), n = typeof t == "function" ? t(r) : t;
    return g.createElement(g.Fragment, null, n)
}

function un(e) {
    let t = {
        hasErrorBoundary: e.ErrorBoundary != null || e.errorElement != null
    };
    return e.Component && Object.assign(t, {
        element: g.createElement(e.Component),
        Component: void 0
    }), e.ErrorBoundary && Object.assign(t, {
        errorElement: g.createElement(e.ErrorBoundary),
        ErrorBoundary: void 0
    }), t
}
var g, we, Ne, Nt, me, ct, ce, on, Ya, Za, tr, rr, Ee, ao, nn, ne, io, nr, dr = Jt(() => {
    g = Fe(Oe());
    Je();
    Je();
    we = g.createContext(null), Ne = g.createContext(null), Nt = g.createContext(null), me = g.createContext(null), ct = g.createContext(null), ce = g.createContext({
        outlet: null,
        matches: [],
        isDataRoute: !1
    }), on = g.createContext(null);
    Ya = g.createContext(null);
    Za = g.createElement(Qa, null), tr = class extends g.Component {
        constructor(t) {
            super(t), this.state = {
                location: t.location,
                revalidation: t.revalidation,
                error: t.error
            }
        }
        static getDerivedStateFromError(t) {
            return {
                error: t
            }
        }
        static getDerivedStateFromProps(t, r) {
            return r.location !== t.location || r.revalidation !== "idle" && t.revalidation === "idle" ? {
                error: t.error,
                location: t.location,
                revalidation: t.revalidation
            } : {
                error: t.error || r.error,
                location: r.location,
                revalidation: t.revalidation || r.revalidation
            }
        }
        componentDidCatch(t, r) {
            console.error("React Router caught the following error during render", t, r)
        }
        render() {
            return this.state.error ? g.createElement(ce.Provider, {
                value: this.props.routeContext
            }, g.createElement(on.Provider, {
                value: this.state.error,
                children: this.props.component
            })) : this.props.children
        }
    };
    (function(e) {
        e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate"
    })(rr || (rr = {}));
    (function(e) {
        e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId"
    })(Ee || (Ee = {}));
    ao = "startTransition", nn = g[ao];
    (function(e) {
        e[e.pending = 0] = "pending", e[e.success = 1] = "success", e[e.error = 2] = "error"
    })(ne || (ne = {}));
    io = new Promise(() => {}), nr = class extends g.Component {
        constructor(t) {
            super(t), this.state = {
                error: null
            }
        }
        static getDerivedStateFromError(t) {
            return {
                error: t
            }
        }
        componentDidCatch(t, r) {
            console.error("<Await> caught the following error during render", t, r)
        }
        render() {
            let {
                children: t,
                errorElement: r,
                resolve: n
            } = this.props, a = null, o = ne.pending;
            if (!(n instanceof Promise)) o = ne.success, a = Promise.resolve(), Object.defineProperty(a, "_tracked", {
                get: () => !0
            }), Object.defineProperty(a, "_data", {
                get: () => n
            });
            else if (this.state.error) {
                o = ne.error;
                let i = this.state.error;
                a = Promise.reject().catch(() => {}), Object.defineProperty(a, "_tracked", {
                    get: () => !0
                }), Object.defineProperty(a, "_error", {
                    get: () => i
                })
            } else n._tracked ? (a = n, o = a._error !== void 0 ? ne.error : a._data !== void 0 ? ne.success : ne.pending) : (o = ne.pending, Object.defineProperty(n, "_tracked", {
                get: () => !0
            }), a = n.then(i => Object.defineProperty(n, "_data", {
                get: () => i
            }), i => Object.defineProperty(n, "_error", {
                get: () => i
            })));
            if (o === ne.error && a._error instanceof fe) throw io;
            if (o === ne.error && !r) throw a._error;
            if (o === ne.error) return g.createElement(Nt.Provider, {
                value: a,
                children: r
            });
            if (o === ne.success) return g.createElement(Nt.Provider, {
                value: a,
                children: t
            });
            throw a
        }
    }
});

function Ie() {
    return Ie = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
        }
        return e
    }, Ie.apply(this, arguments)
}

function fn(e, t) {
    if (e == null) return {};
    var r = {},
        n = Object.keys(e),
        a, o;
    for (o = 0; o < n.length; o++) a = n[o], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
    return r
}

function Ro(e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
}

function go(e, t) {
    return e.button === 0 && (!t || t === "_self") && !Ro(e)
}

function hn(e, t) {
    return qt({
        basename: t ? .basename,
        future: Ie({}, t ? .future, {
            v7_prependBasename: !0
        }),
        history: Yr({
            window: t ? .window
        }),
        hydrationData: t ? .hydrationData || wo(),
        routes: e,
        mapRouteProperties: un
    }).initialize()
}

function wo() {
    var e;
    let t = (e = window) == null ? void 0 : e.__staticRouterHydrationData;
    return t && t.errors && (t = Ie({}, t, {
        errors: bo(t.errors)
    })), t
}

function bo(e) {
    if (!e) return null;
    let t = Object.entries(e),
        r = {};
    for (let [n, a] of t)
        if (a && a.__type === "RouteErrorResponse") r[n] = new _e(a.status, a.statusText, a.data, a.internal === !0);
        else if (a && a.__type === "Error") {
        if (a.__subType) {
            let o = window[a.__subType];
            if (typeof o == "function") try {
                let i = new o(a.message);
                i.stack = "", r[n] = i
            } catch {}
        }
        if (r[n] == null) {
            let o = new Error(a.message);
            o.stack = "", r[n] = o
        }
    } else r[n] = a;
    return r
}

function No(e) {
    let t = j.useContext(we);
    return t || A(!1), t
}

function Do(e) {
    let t = j.useContext(Ne);
    return t || A(!1), t
}

function Co(e, t) {
    let {
        target: r,
        replace: n,
        state: a,
        preventScrollReset: o,
        relative: i
    } = t === void 0 ? {} : t, l = Dt(), s = ee(), u = Xe(e, {
        relative: i
    });
    return j.useCallback(c => {
        if (go(c, r)) {
            c.preventDefault();
            let m = n !== void 0 ? n : ue(s) === ue(u);
            l(e, {
                replace: m,
                state: a,
                preventScrollReset: o,
                relative: i
            })
        }
    }, [s, l, u, n, a, r, e, o, i])
}

function pn(e) {
    let {
        getKey: t,
        storageKey: r
    } = e === void 0 ? {} : e, {
        router: n
    } = No(fr.UseScrollRestoration), {
        restoreScrollPosition: a,
        preventScrollReset: o
    } = Do(hr.UseScrollRestoration), {
        basename: i
    } = j.useContext(me), l = ee(), s = dt(), u = Ye();
    j.useEffect(() => (window.history.scrollRestoration = "manual", () => {
        window.history.scrollRestoration = "auto"
    }), []), Lo(j.useCallback(() => {
        if (u.state === "idle") {
            let c = (t ? t(l, s) : null) || l.key;
            Mt[c] = window.scrollY
        }
        sessionStorage.setItem(r || cn, JSON.stringify(Mt)), window.history.scrollRestoration = "auto"
    }, [r, t, u.state, l, s])), typeof document < "u" && (j.useLayoutEffect(() => {
        try {
            let c = sessionStorage.getItem(r || cn);
            c && (Mt = JSON.parse(c))
        } catch {}
    }, [r]), j.useLayoutEffect(() => {
        let c = t && i !== "/" ? (R, w) => t(Ie({}, R, {
                pathname: ve(R.pathname, i) || R.pathname
            }), w) : t,
            m = n ? .enableScrollRestoration(Mt, () => window.scrollY, c);
        return () => m && m()
    }, [n, i, t]), j.useLayoutEffect(() => {
        if (a !== !1) {
            if (typeof a == "number") {
                window.scrollTo(0, a);
                return
            }
            if (l.hash) {
                let c = document.getElementById(decodeURIComponent(l.hash.slice(1)));
                if (c) {
                    c.scrollIntoView();
                    return
                }
            }
            o !== !0 && window.scrollTo(0, 0)
        }
    }, [l, a, o]))
}

function Lo(e, t) {
    let {
        capture: r
    } = t || {};
    j.useEffect(() => {
        let n = r != null ? {
            capture: r
        } : void 0;
        return window.addEventListener("pagehide", e, n), () => {
            window.removeEventListener("pagehide", e, n)
        }
    }, [e, r])
}
var j, vo, Eo, xo, _i, So, _o, mr, mn, fr, hr, cn, Mt, De = Jt(() => {
    j = Fe(Oe());
    dr();
    dr();
    Je();
    vo = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"], Eo = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"];
    xo = "startTransition", _i = j[xo], So = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", _o = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, mr = j.forwardRef(function(t, r) {
        let {
            onClick: n,
            relative: a,
            reloadDocument: o,
            replace: i,
            state: l,
            target: s,
            to: u,
            preventScrollReset: c
        } = t, m = fn(t, vo), {
            basename: R
        } = j.useContext(me), w, v = !1;
        if (typeof u == "string" && _o.test(u) && (w = u, So)) try {
            let O = new URL(window.location.href),
                D = u.startsWith("//") ? new URL(O.protocol + u) : new URL(u),
                d = ve(D.pathname, R);
            D.origin === O.origin && d != null ? u = d + D.search + D.hash : v = !0
        } catch {}
        let E = Te(u, {
                relative: a
            }),
            b = Co(u, {
                replace: i,
                state: l,
                target: s,
                preventScrollReset: c,
                relative: a
            });

        function _(O) {
            n && n(O), O.defaultPrevented || b(O)
        }
        return j.createElement("a", Ie({}, m, {
            href: w || E,
            onClick: v || o ? n : _,
            ref: r,
            target: s
        }))
    }), mn = j.forwardRef(function(t, r) {
        let {
            "aria-current": n = "page",
            caseSensitive: a = !1,
            className: o = "",
            end: i = !1,
            style: l,
            to: s,
            children: u
        } = t, c = fn(t, Eo), m = Xe(s, {
            relative: c.relative
        }), R = ee(), w = j.useContext(Ne), {
            navigator: v
        } = j.useContext(me), E = v.encodeLocation ? v.encodeLocation(m).pathname : m.pathname, b = R.pathname, _ = w && w.navigation && w.navigation.location ? w.navigation.location.pathname : null;
        a || (b = b.toLowerCase(), _ = _ ? _.toLowerCase() : null, E = E.toLowerCase());
        let O = b === E || !i && b.startsWith(E) && b.charAt(E.length) === "/",
            D = _ != null && (_ === E || !i && _.startsWith(E) && _.charAt(E.length) === "/"),
            d = O ? n : void 0,
            C;
        typeof o == "function" ? C = o({
            isActive: O,
            isPending: D
        }) : C = [o, O ? "active" : null, D ? "pending" : null].filter(Boolean).join(" ");
        let T = typeof l == "function" ? l({
            isActive: O,
            isPending: D
        }) : l;
        return j.createElement(mr, Ie({}, c, {
            "aria-current": d,
            className: C,
            ref: r,
            style: T,
            to: s
        }), typeof u == "function" ? u({
            isActive: O,
            isPending: D
        }) : u)
    });
    (function(e) {
        e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher"
    })(fr || (fr = {}));
    (function(e) {
        e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration"
    })(hr || (hr = {}));
    cn = "react-router-scroll-positions", Mt = {}
});
var Ce = Fe(Oe());
De();

function V() {
    return V = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
        }
        return e
    }, V.apply(this, arguments)
}
var y = Fe(Oe());
De();
var U = Fe(Oe());
De();
var At = class extends U.default.Component {
    constructor(t) {
        super(t), this.state = {
            error: t.error || null,
            location: t.location
        }
    }
    static getDerivedStateFromError(t) {
        return {
            error: t
        }
    }
    static getDerivedStateFromProps(t, r) {
        return r.location !== t.location ? {
            error: t.error || null,
            location: t.location
        } : {
            error: t.error || r.error,
            location: r.location
        }
    }
    render() {
        return this.state.error ? U.default.createElement(this.props.component, {
            error: this.state.error
        }) : this.props.children
    }
};

function Ge({
    error: e
}) {
    return U.default.useEffect(() => {
        console.error(e)
    }, [e]), U.default.createElement("html", {
        lang: "en"
    }, U.default.createElement("head", null, U.default.createElement("meta", {
        charSet: "utf-8"
    }), U.default.createElement("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover"
    }), U.default.createElement("title", null, "Application Error!")), U.default.createElement("body", null, U.default.createElement("main", {
        style: {
            fontFamily: "system-ui, sans-serif",
            padding: "2rem"
        }
    }, U.default.createElement("h1", {
        style: {
            fontSize: "24px"
        }
    }, "Application Error"), e.stack ? U.default.createElement("pre", {
        style: {
            padding: "2rem",
            background: "hsla(10, 50%, 50%, 0.1)",
            color: "red",
            overflow: "auto"
        }
    }, e.stack) : null), U.default.createElement("script", {
        dangerouslySetInnerHTML: {
            __html: `
              console.log(
                "\u{1F4BF} Hey developer\u{1F44B}. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
              );
            `
        }
    })))
}

function yn() {
    let e = ke();
    if (he(e)) return U.default.createElement(En, {
        caught: e
    });
    if (e instanceof Error) return U.default.createElement(Ge, {
        error: e
    }); {
        let t = e == null ? "Unknown Error" : typeof e == "object" && "toString" in e ? e.toString() : JSON.stringify(e);
        return U.default.createElement(Ge, {
            error: new Error(t)
        })
    }
}
var Rn = U.default.createContext(void 0);

function Po() {
    return (0, U.useContext)(Rn)
}

function gn({
    catch: e,
    component: t,
    children: r
}) {
    return e ? U.default.createElement(Rn.Provider, {
        value: e
    }, U.default.createElement(t, null)) : U.default.createElement(U.default.Fragment, null, r)
}

function vn() {
    let e = Po();
    return U.default.createElement(En, {
        caught: e
    })
}

function En({
    caught: e
}) {
    return U.default.createElement("html", {
        lang: "en"
    }, U.default.createElement("head", null, U.default.createElement("meta", {
        charSet: "utf-8"
    }), U.default.createElement("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover"
    }), U.default.createElement("title", null, "Unhandled Thrown Response!")), U.default.createElement("body", null, U.default.createElement("h1", {
        style: {
            fontFamily: "system-ui, sans-serif",
            padding: "2rem"
        }
    }, e.status, " ", e.statusText), U.default.createElement("script", {
        dangerouslySetInnerHTML: {
            __html: `
              console.log(
                "\u{1F4BF} Hey developer\u{1F44B}. You can provide a way better UX than this when your app throws 404s (and other responses). Check out https://remix.run/guides/not-found for more information."
              );
            `
        }
    })))
}

function de(e, t) {
    if (e === !1 || e === null || typeof e > "u") throw new Error(t)
}
De();
async function Ft(e, t) {
    if (e.id in t) return t[e.id];
    try {
        let r = await
        import (e.module);
        return t[e.id] = r, r
    } catch {
        return window.location.reload(), new Promise(() => {})
    }
}

function wn(e, t, r) {
    let n = e.map(o => {
            var i;
            let l = t[o.route.id];
            return ((i = l.links) === null || i === void 0 ? void 0 : i.call(l)) || []
        }).flat(1),
        a = Fo(e, r);
    return Oo(n, a)
}
async function bn(e) {
    if (!e.links) return;
    let t = e.links();
    if (!t) return;
    let r = [];
    for (let a of t) !Ot(a) && a.rel === "stylesheet" && r.push({ ...a,
        rel: "preload",
        as: "style"
    });
    let n = r.filter(a => (!a.media || window.matchMedia(a.media).matches) && !document.querySelector(`link[rel="stylesheet"][href="${a.href}"]`));
    await Promise.all(n.map(Mo))
}
async function Mo(e) {
    return new Promise(t => {
        let r = document.createElement("link");
        Object.assign(r, e);

        function n() {
            document.head.contains(r) && document.head.removeChild(r)
        }
        r.onload = () => {
            n(), t()
        }, r.onerror = () => {
            n(), t()
        }, document.head.appendChild(r)
    })
}

function Ot(e) {
    return e != null && typeof e.page == "string"
}

function Ao(e) {
    return e == null ? !1 : e.href == null ? e.rel === "preload" && (typeof e.imageSrcSet == "string" || typeof e.imagesrcset == "string") && (typeof e.imageSizes == "string" || typeof e.imagesizes == "string") : typeof e.rel == "string" && typeof e.href == "string"
}
async function xn(e, t, r) {
    return (await Promise.all(e.map(async a => {
        let o = await Ft(t.routes[a.route.id], r);
        return o.links ? o.links() : []
    }))).flat(1).filter(Ao).filter(a => a.rel === "stylesheet" || a.rel === "preload").map(a => a.rel === "preload" ? { ...a,
        rel: "prefetch"
    } : { ...a,
        rel: "prefetch",
        as: "style"
    })
}

function pr(e, t, r, n, a, o) {
    let i = Nn(e),
        l = (c, m) => r[m] ? c.route.id !== r[m].route.id : !0,
        s = (c, m) => {
            var R;
            return r[m].pathname !== c.pathname || ((R = r[m].route.path) === null || R === void 0 ? void 0 : R.endsWith("*")) && r[m].params["*"] !== c.params["*"]
        };
    return o === "data" && a.search !== i.search ? t.filter((c, m) => {
        if (!n.routes[c.route.id].hasLoader) return !1;
        if (l(c, m) || s(c, m)) return !0;
        if (c.route.shouldRevalidate) {
            var w;
            let v = c.route.shouldRevalidate({
                currentUrl: new URL(a.pathname + a.search + a.hash, window.origin),
                currentParams: ((w = r[0]) === null || w === void 0 ? void 0 : w.params) || {},
                nextUrl: new URL(e, window.origin),
                nextParams: c.params,
                defaultShouldRevalidate: !0
            });
            if (typeof v == "boolean") return v
        }
        return !0
    }) : t.filter((c, m) => {
        let R = n.routes[c.route.id];
        return (o === "assets" || R.hasLoader) && (l(c, m) || s(c, m))
    })
}

function Sn(e, t, r) {
    let n = Nn(e);
    return yr(t.filter(a => r.routes[a.route.id].hasLoader).map(a => {
        let {
            pathname: o,
            search: i
        } = n, l = new URLSearchParams(i);
        return l.set("_data", a.route.id), `${o}?${l}`
    }))
}

function _n(e, t) {
    return yr(e.map(r => {
        let n = t.routes[r.route.id],
            a = [n.module];
        return n.imports && (a = a.concat(n.imports)), a
    }).flat(1))
}

function Fo(e, t) {
    return yr(e.map(r => {
        let n = t.routes[r.route.id],
            a = [n.module];
        return n.imports && (a = a.concat(n.imports)), a
    }).flat(1))
}

function yr(e) {
    return [...new Set(e)]
}

function Oo(e, t) {
    let r = new Set,
        n = new Set(t);
    return e.reduce((a, o) => {
        if (!Ot(o) && o.as === "script" && o.href && n.has(o.href)) return a;
        let l = JSON.stringify(o);
        return r.has(l) || (r.add(l), a.push(o)), a
    }, [])
}

function Nn(e) {
    let t = q(e);
    return t.search === void 0 && (t.search = ""), t
}
var Uo = {
        "&": "\\u0026",
        ">": "\\u003e",
        "<": "\\u003c",
        "\u2028": "\\u2028",
        "\u2029": "\\u2029"
    },
    To = /[&><\u2028\u2029]/g;

function ft(e) {
    return e.replace(To, t => Uo[t])
}

function Rr(e) {
    return {
        __html: e
    }
}

function Cn() {
    let e = y.useContext(we);
    return de(e, "You must render this element inside a <DataRouterContext.Provider> element"), e
}

function mt() {
    let e = y.useContext(Ne);
    return de(e, "You must render this element inside a <DataRouterStateContext.Provider> element"), e
}
var pt = y.createContext(void 0);
pt.displayName = "Remix";

function pe() {
    let e = y.useContext(pt);
    return de(e, "You must render this element inside a <Remix> element"), e
}

function Ln({
    id: e
}) {
    let {
        routeModules: t,
        future: r
    } = pe();
    de(t, `Cannot initialize 'routeModules'. This normally occurs when you have server code in your client modules.
Check this link for more details:
https://remix.run/pages/gotchas#server-code-in-client-bundles`);
    let {
        default: n,
        ErrorBoundary: a,
        CatchBoundary: o
    } = t[e];
    return !n && (a || !r.v2_errorBoundary && o) && (n = Pt), de(n, `Route "${e}" has no component! Please go add a \`default\` export in the route module file.
If you were trying to navigate or submit to a resource route, use \`<a>\` instead of \`<Link>\` or \`<Form reloadDocument>\`.`), y.createElement(n, null)
}

function Pn({
    id: e
}) {
    let {
        future: t,
        routeModules: r
    } = pe();
    de(r, `Cannot initialize 'routeModules'. This normally occurs when you have server code in your client modules.
Check this link for more details:
https://remix.run/pages/gotchas#server-code-in-client-bundles`);
    let n = ke(),
        {
            CatchBoundary: a,
            ErrorBoundary: o
        } = r[e];
    if (t.v2_errorBoundary) {
        if (e === "root" && (o || (o = yn)), o) return y.createElement(o, null);
        throw n
    }
    if (e === "root" && (a || (a = vn), o || (o = Ge)), he(n)) {
        let i = n;
        if (i != null && i.error && i.status !== 404 && o) return y.createElement(o, {
            error: i.error
        });
        if (a) return y.createElement(gn, {
            catch: n,
            component: a
        })
    }
    if (n instanceof Error && o) return y.createElement(o, {
        error: n
    });
    throw n
}

function Mn(e, t) {
    let [r, n] = y.useState(!1), [a, o] = y.useState(!1), {
        onFocus: i,
        onBlur: l,
        onMouseEnter: s,
        onMouseLeave: u,
        onTouchStart: c
    } = t, m = y.useRef(null);
    y.useEffect(() => {
        if (e === "render" && o(!0), e === "viewport") {
            let v = b => {
                    b.forEach(_ => {
                        o(_.isIntersecting)
                    })
                },
                E = new IntersectionObserver(v, {
                    threshold: .5
                });
            return m.current && E.observe(m.current), () => {
                E.disconnect()
            }
        }
    }, [e]);
    let R = () => {
            e === "intent" && n(!0)
        },
        w = () => {
            e === "intent" && (n(!1), o(!1))
        };
    return y.useEffect(() => {
        if (r) {
            let v = setTimeout(() => {
                o(!0)
            }, 100);
            return () => {
                clearTimeout(v)
            }
        }
    }, [r]), [a, m, {
        onFocus: ht(i, R),
        onBlur: ht(l, w),
        onMouseEnter: ht(s, R),
        onMouseLeave: ht(u, w),
        onTouchStart: ht(c, R)
    }]
}
var An = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
    Fn = y.forwardRef(({
        to: e,
        prefetch: t = "none",
        ...r
    }, n) => {
        let a = typeof e == "string" && An.test(e),
            o = Te(e),
            [i, l, s] = Mn(t, r);
        return y.createElement(y.Fragment, null, y.createElement(mn, V({}, r, s, {
            ref: Tn(n, l),
            to: e
        })), i && !a ? y.createElement(Ut, {
            page: o
        }) : null)
    });
Fn.displayName = "NavLink";
var On = y.forwardRef(({
    to: e,
    prefetch: t = "none",
    ...r
}, n) => {
    let a = typeof e == "string" && An.test(e),
        o = Te(e),
        [i, l, s] = Mn(t, r);
    return y.createElement(y.Fragment, null, y.createElement(mr, V({}, r, s, {
        ref: Tn(n, l),
        to: e
    })), i && !a ? y.createElement(Ut, {
        page: o
    }) : null)
});
On.displayName = "Link";

function ht(e, t) {
    return r => {
        e && e(r), r.defaultPrevented || t(r)
    }
}
var ko = "\u26A0\uFE0F REMIX FUTURE CHANGE: The behavior of links `imagesizes` and `imagesrcset` will be changing in v2. Only the React camel case versions will be valid. Please change to `imageSizes` and `imageSrcSet`. For instructions on making this change see https://remix.run/docs/en/v1.15.0/pages/v2#links-imagesizes-and-imagesrcset";

function Io() {
    let {
        manifest: e,
        routeModules: t
    } = pe(), {
        errors: r,
        matches: n
    } = mt(), a = r ? n.slice(0, n.findIndex(i => r[i.route.id]) + 1) : n, o = y.useMemo(() => wn(a, t, e), [a, t, e]);
    return y.useEffect(() => {
        o.some(i => "imagesizes" in i || "imagesrcset" in i) && void 0
    }, [o]), y.createElement(y.Fragment, null, o.map(i => {
        if (Ot(i)) return y.createElement(Ut, V({
            key: i.page
        }, i));
        let l = null;
        return "useId" in y ? (i.imagesrcset && (i.imageSrcSet = l = i.imagesrcset, delete i.imagesrcset), i.imagesizes && (i.imageSizes = i.imagesizes, delete i.imagesizes)) : (i.imageSrcSet && (i.imagesrcset = l = i.imageSrcSet, delete i.imageSrcSet), i.imageSizes && (i.imagesizes = i.imageSizes, delete i.imageSizes)), y.createElement("link", V({
            key: i.rel + (i.href || "") + (l || "")
        }, i))
    }))
}

function Ut({
    page: e,
    ...t
}) {
    let {
        router: r
    } = Cn(), n = y.useMemo(() => re(r.routes, e), [r.routes, e]);
    return n ? y.createElement(Bo, V({
        page: e,
        matches: n
    }, t)) : (console.warn(`Tried to prefetch ${e} but no routes matched.`), null)
}

function jo(e) {
    let {
        manifest: t,
        routeModules: r
    } = pe(), [n, a] = y.useState([]);
    return y.useEffect(() => {
        let o = !1;
        return xn(e, t, r).then(i => {
            o || a(i)
        }), () => {
            o = !0
        }
    }, [e, t, r]), n
}

function Bo({
    page: e,
    matches: t,
    ...r
}) {
    let n = ee(),
        {
            manifest: a
        } = pe(),
        {
            matches: o
        } = mt(),
        i = y.useMemo(() => pr(e, t, o, a, n, "data"), [e, t, o, a, n]),
        l = y.useMemo(() => pr(e, t, o, a, n, "assets"), [e, t, o, a, n]),
        s = y.useMemo(() => Sn(e, i, a), [i, e, a]),
        u = y.useMemo(() => _n(l, a), [l, a]),
        c = jo(l);
    return y.createElement(y.Fragment, null, s.map(m => y.createElement("link", V({
        key: m,
        rel: "prefetch",
        as: "fetch",
        href: m
    }, r))), u.map(m => y.createElement("link", V({
        key: m,
        rel: "modulepreload",
        href: m
    }, r))), c.map(m => y.createElement("link", V({
        key: m.href
    }, m))))
}

function Ho() {
    let {
        routeModules: e
    } = pe(), {
        errors: t,
        matches: r,
        loaderData: n
    } = mt(), a = ee(), o = t ? r.slice(0, r.findIndex(s => t[s.route.id]) + 1) : r, i = {}, l = {};
    for (let s of o) {
        let u = s.route.id,
            c = n[u],
            m = s.params,
            R = e[u];
        if (R.meta) {
            let w = typeof R.meta == "function" ? R.meta({
                data: c,
                parentsData: l,
                params: m,
                location: a
            }) : R.meta;
            if (w && Array.isArray(w)) throw new Error("The route at " + s.route.path + " returns an array. This is only supported with the `v2_meta` future flag in the Remix config. Either set the flag to `true` or update the route's meta function to return an object.\n\nTo reference the v1 meta function API, see https://remix.run/route/meta");
            Object.assign(i, w)
        }
        l[u] = c
    }
    return y.createElement(y.Fragment, null, Object.entries(i).map(([s, u]) => {
        if (!u) return null;
        if (["charset", "charSet"].includes(s)) return y.createElement("meta", {
            key: "charSet",
            charSet: u
        });
        if (s === "title") return y.createElement("title", {
            key: "title"
        }, String(u));
        let c = /^(og|music|video|article|book|profile|fb):.+$/.test(s);
        return [u].flat().map(m => c ? y.createElement("meta", {
            property: s,
            content: m,
            key: s + m
        }) : typeof m == "string" ? y.createElement("meta", {
            name: s,
            content: m,
            key: s + m
        }) : y.createElement("meta", V({
            key: s + JSON.stringify(m)
        }, m)))
    }))
}

function $o() {
    let {
        routeModules: e
    } = pe(), {
        errors: t,
        matches: r,
        loaderData: n
    } = mt(), a = ee(), o = t ? r.slice(0, r.findIndex(u => t[u.route.id]) + 1) : r, i = [], l = null, s = [];
    for (let u = 0; u < o.length; u++) {
        let c = o[u],
            m = c.route.id,
            R = n[m],
            w = c.params,
            v = e[m],
            E = [],
            b = {
                id: m,
                data: R,
                meta: [],
                params: c.params,
                pathname: c.pathname,
                handle: c.route.handle,
                get route() {
                    return console.warn("The meta function in " + c.route.path + " accesses the `route` property on `matches`. This is deprecated and will be removed in Remix version 2. See"), c.route
                }
            };
        if (s[u] = b, v != null && v.meta ? E = typeof v.meta == "function" ? v.meta({
                data: R,
                params: w,
                location: a,
                matches: s
            }) : Array.isArray(v.meta) ? [...v.meta] : v.meta : l && (E = [...l]), E = E || [], !Array.isArray(E)) throw new Error("The `v2_meta` API is enabled in the Remix config, but the route at " + c.route.path + ` returns an invalid value. In v2, all route meta functions must return an array of meta objects.

To reference the v1 meta function API, see https://remix.run/route/meta`);
        b.meta = E, s[u] = b, i = [...E], l = i
    }
    return y.createElement(y.Fragment, null, i.flat().map(u => {
        if (!u) return null;
        if ("tagName" in u) {
            let c = u.tagName;
            return delete u.tagName, zo(c) ? y.createElement(c, V({
                key: JSON.stringify(u)
            }, u)) : (console.warn(`A meta object uses an invalid tagName: ${c}. Expected either 'link' or 'meta'`), null)
        }
        if ("title" in u) return y.createElement("title", {
            key: "title"
        }, String(u.title));
        if ("charset" in u && (u.charSet ? ? (u.charSet = u.charset), delete u.charset), "charSet" in u && u.charSet != null) return typeof u.charSet == "string" ? y.createElement("meta", {
            key: "charSet",
            charSet: u.charSet
        }) : null;
        if ("script:ld+json" in u) {
            let c = null;
            try {
                c = JSON.stringify(u["script:ld+json"])
            } catch {}
            return c != null && y.createElement("script", {
                key: "script:ld+json",
                type: "application/ld+json",
                dangerouslySetInnerHTML: {
                    __html: JSON.stringify(u["script:ld+json"])
                }
            })
        }
        return y.createElement("meta", V({
            key: JSON.stringify(u)
        }, u))
    }))
}

function zo(e) {
    return typeof e == "string" && /^(meta|link)$/.test(e)
}

function Vo() {
    let {
        future: e
    } = pe();
    return e != null && e.v2_meta ? y.createElement($o, null) : y.createElement(Ho, null)
}

function Un(e) {
    return y.createElement(cr, e)
}
var gr = !1;

function Wo(e) {
    let {
        manifest: t,
        serverHandoffString: r,
        abortDelay: n,
        serializeError: a
    } = pe(), {
        router: o,
        static: i,
        staticContext: l
    } = Cn(), {
        matches: s
    } = mt(), u = Ye();
    y.useEffect(() => {
        gr = !0
    }, []);
    let c = (D, d) => {
            let C;
            return a && d instanceof Error ? C = a(d) : C = d, `${JSON.stringify(D)}:__remixContext.p(!1, ${ft(JSON.stringify(C))})`
        },
        m = (D, d, C) => {
            let T;
            try {
                T = JSON.stringify(C)
            } catch (F) {
                return c(d, F)
            }
            return `${JSON.stringify(d)}:__remixContext.p(${ft(T)})`
        },
        R = (D, d, C) => {
            let T;
            return a && C instanceof Error ? T = a(C) : T = C, `__remixContext.r(${JSON.stringify(D)}, ${JSON.stringify(d)}, !1, ${ft(JSON.stringify(T))})`
        },
        w = (D, d, C) => {
            let T;
            try {
                T = JSON.stringify(C)
            } catch (F) {
                return R(D, d, F)
            }
            return `__remixContext.r(${JSON.stringify(D)}, ${JSON.stringify(d)}, ${ft(T)})`
        },
        v = [],
        E = y.useMemo(() => {
            var D;
            let d = l ? `window.__remixContext = ${r};` : " ",
                C = l ? .activeDeferreds;
            d += C ? ["__remixContext.p = function(v,e,p,x) {", "  if (typeof e !== 'undefined') {", `    x=new Error("Unexpected Server Error");
    x.stack=undefined;`, "    p=Promise.reject(x);", "  } else {", "    p=Promise.resolve(v);", "  }", "  return p;", "};", "__remixContext.n = function(i,k) {", "  __remixContext.t = __remixContext.t || {};", "  __remixContext.t[i] = __remixContext.t[i] || {};", "  let p = new Promise((r, e) => {__remixContext.t[i][k] = {r:(v)=>{r(v);},e:(v)=>{e(v);}};});", typeof n == "number" ? `setTimeout(() => {if(typeof p._error !== "undefined" || typeof p._data !== "undefined"){return;} __remixContext.t[i][k].e(new Error("Server timeout."))}, ${n});` : "", "  return p;", "};", "__remixContext.r = function(i,k,v,e,p,x) {", "  p = __remixContext.t[i][k];", "  if (typeof e !== 'undefined') {", `    x=new Error("Unexpected Server Error");
    x.stack=undefined;`, "    p.e(x);", "  } else {", "    p.r(v);", "  }", "};"].join(`
`) + Object.entries(C).map(([F, J]) => {
                let te = new Set(J.pendingKeys),
                    ae = J.deferredKeys.map(Z => {
                        if (te.has(Z)) return v.push(y.createElement(Dn, {
                            key: `${F} | ${Z}`,
                            deferredData: J,
                            routeId: F,
                            dataKey: Z,
                            scriptProps: e,
                            serializeData: w,
                            serializeError: R
                        })), `${JSON.stringify(Z)}:__remixContext.n(${JSON.stringify(F)}, ${JSON.stringify(Z)})`; {
                            let $ = J.data[Z];
                            return typeof $._error < "u" ? c(Z, $._error) : m(F, Z, $._data)
                        }
                    }).join(`,
`);
                return `Object.assign(__remixContext.state.loaderData[${JSON.stringify(F)}], {${ae}});`
            }).join(`
`) + (v.length > 0 ? `__remixContext.a=${v.length};` : "") : "";
            let T = i ? `${(D=t.hmr)!==null&&D!==void 0&&D.runtime?`import ${JSON.stringify(t.hmr.runtime)};`:""}import ${JSON.stringify(t.url)};
${s.map((F,J)=>`import * as route${J} from ${JSON.stringify(t.routes[F.route.id].module)};`).join(`
`)}
window.__remixRouteModules = {${s.map((F,J)=>`${JSON.stringify(F.route.id)}:route${J}`).join(",")}};

import(${JSON.stringify(t.entry.module)});` : " ";
            return y.createElement(y.Fragment, null, y.createElement("script", V({}, e, {
                suppressHydrationWarning: !0,
                dangerouslySetInnerHTML: Rr(d),
                type: void 0
            })), y.createElement("script", V({}, e, {
                suppressHydrationWarning: !0,
                dangerouslySetInnerHTML: Rr(T),
                type: "module",
                async: !0
            })))
        }, []);
    if (!i && typeof __remixContext == "object" && __remixContext.a)
        for (let D = 0; D < __remixContext.a; D++) v.push(y.createElement(Dn, {
            key: D,
            scriptProps: e,
            serializeData: w,
            serializeError: R
        }));
    let b = y.useMemo(() => {
            if (u.location) {
                let D = re(o.routes, u.location);
                return de(D, `No routes match path "${u.location.pathname}"`), D
            }
            return []
        }, [u.location, o.routes]),
        _ = s.concat(b).map(D => {
            let d = t.routes[D.route.id];
            return (d.imports || []).concat([d.module])
        }).flat(1),
        O = gr ? [] : t.entry.imports.concat(_);
    return gr ? null : y.createElement(y.Fragment, null, y.createElement("link", {
        rel: "modulepreload",
        href: t.entry.module,
        crossOrigin: e.crossOrigin
    }), Ko(O).map(D => y.createElement("link", {
        key: D,
        rel: "modulepreload",
        href: D,
        crossOrigin: e.crossOrigin
    })), E, v)
}

function Dn({
    dataKey: e,
    deferredData: t,
    routeId: r,
    scriptProps: n,
    serializeData: a,
    serializeError: o
}) {
    return typeof document > "u" && t && e && r && de(t.pendingKeys.includes(e), `Deferred data for route ${r} with key ${e} was not pending but tried to render a script for it.`), y.createElement(y.Suspense, {
        fallback: typeof document > "u" && t && e && r ? null : y.createElement("script", V({}, n, {
            async: !0,
            suppressHydrationWarning: !0,
            dangerouslySetInnerHTML: {
                __html: " "
            }
        }))
    }, typeof document > "u" && t && e && r ? y.createElement(Un, {
        resolve: t.data[e],
        errorElement: y.createElement(Jo, {
            dataKey: e,
            routeId: r,
            scriptProps: n,
            serializeError: o
        }),
        children: i => y.createElement("script", V({}, n, {
            async: !0,
            suppressHydrationWarning: !0,
            dangerouslySetInnerHTML: {
                __html: a(r, e, i)
            }
        }))
    }) : y.createElement("script", V({}, n, {
        async: !0,
        suppressHydrationWarning: !0,
        dangerouslySetInnerHTML: {
            __html: " "
        }
    })))
}

function Jo({
    dataKey: e,
    routeId: t,
    scriptProps: r,
    serializeError: n
}) {
    let a = Lt();
    return y.createElement("script", V({}, r, {
        suppressHydrationWarning: !0,
        dangerouslySetInnerHTML: {
            __html: n(t, e, a)
        }
    }))
}

function Ko(e) {
    return [...new Set(e)]
}

function vr() {
    let {
        routeModules: e
    } = pe(), t = dt();
    return y.useMemo(() => t.map(r => ({
        id: r.id,
        pathname: r.pathname,
        params: r.params,
        data: r.data,
        handle: e[r.id].handle
    })), [t, e])
}

function Xo() {
    return ir()
}
var Yo = () => null;

function Tn(...e) {
    return t => {
        e.forEach(r => {
            typeof r == "function" ? r(t) : r != null && (r.current = t)
        })
    }
}
Je();

function kn(e) {
    if (!e) return null;
    let t = Object.entries(e),
        r = {};
    for (let [n, a] of t)
        if (a && a.__type === "RouteErrorResponse") r[n] = new _e(a.status, a.statusText, a.data, a.internal === !0);
        else if (a && a.__type === "Error") {
        if (a.__subType) {
            let o = window[a.__subType];
            if (typeof o == "function") try {
                let i = new o(a.message);
                i.stack = a.stack, r[n] = i
            } catch {}
        }
        if (r[n] == null) {
            let o = new Error(a.message);
            o.stack = a.stack, r[n] = o
        }
    } else r[n] = a;
    return r
}
var wr = Fe(Oe());
De();
Je();

function jn(e) {
    return e.headers.get("X-Remix-Catch") != null
}

function Go(e) {
    return e.headers.get("X-Remix-Error") != null
}

function Qo(e) {
    return Zo(e) && e.status >= 400 && e.headers.get("X-Remix-Error") == null && e.headers.get("X-Remix-Catch") == null && e.headers.get("X-Remix-Response") == null
}

function Bn(e) {
    return e.headers.get("X-Remix-Redirect") != null
}

function Hn(e) {
    var t;
    return !!((t = e.headers.get("Content-Type")) !== null && t !== void 0 && t.match(/text\/remix-deferred/))
}

function Zo(e) {
    return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body < "u"
}
async function Er(e, t, r = 0) {
    let n = new URL(e.url);
    n.searchParams.set("_data", t);
    let a = {
        signal: e.signal
    };
    if (e.method !== "GET") {
        a.method = e.method;
        let l = e.headers.get("Content-Type");
        l && /\bapplication\/json\b/.test(l) ? (a.headers = {
            "Content-Type": l
        }, a.body = JSON.stringify(await e.json())) : l && /\btext\/plain\b/.test(l) ? (a.headers = {
            "Content-Type": l
        }, a.body = await e.text()) : l && /\bapplication\/x-www-form-urlencoded\b/.test(l) ? a.body = new URLSearchParams(await e.text()) : a.body = await e.formData()
    }
    r > 0 && await new Promise(l => setTimeout(l, 5 ** r * 10));
    let o = window.__remixRevalidation,
        i = await fetch(n.href, a).catch(l => {
            if (typeof o == "number" && o === window.__remixRevalidation && l ? .name === "TypeError" && r < 3) return Er(e, t, r + 1);
            throw l
        });
    if (Go(i)) {
        let l = await i.json(),
            s = new Error(l.message);
        return s.stack = l.stack, s
    }
    if (Qo(i)) {
        let l = await i.text(),
            s = new Error(l);
        return s.stack = void 0, s
    }
    return i
}
var qo = "__deferred_promise:";
async function $n(e) {
    if (!e) throw new Error("parseDeferredReadableStream requires stream argument");
    let t, r = {};
    try {
        let n = ei(e),
            o = (await n.next()).value;
        if (!o) throw new Error("no critical data");
        let i = JSON.parse(o);
        if (typeof i == "object" && i !== null)
            for (let [l, s] of Object.entries(i)) typeof s != "string" || !s.startsWith(qo) || (t = t || {}, t[l] = new Promise((u, c) => {
                r[l] = {
                    resolve: m => {
                        u(m), delete r[l]
                    },
                    reject: m => {
                        c(m), delete r[l]
                    }
                }
            }));
        return (async () => {
            try {
                for await (let l of n) {
                    let [s, ...u] = l.split(":"), c = u.join(":"), m = JSON.parse(c);
                    if (s === "data")
                        for (let [R, w] of Object.entries(m)) r[R] && r[R].resolve(w);
                    else if (s === "error")
                        for (let [R, w] of Object.entries(m)) {
                            let v = new Error(w.message);
                            v.stack = w.stack, r[R] && r[R].reject(v)
                        }
                }
                for (let [l, s] of Object.entries(r)) s.reject(new fe(`Deferred ${l} will never be resolved`))
            } catch (l) {
                for (let s of Object.values(r)) s.reject(l)
            }
        })(), new wt({ ...i,
            ...t
        })
    } catch (n) {
        for (let a of Object.values(r)) a.reject(n);
        throw n
    }
}
async function* ei(e) {
    let t = e.getReader(),
        r = [],
        n = [],
        a = !1,
        o = new TextEncoder,
        i = new TextDecoder,
        l = async () => {
            if (n.length > 0) return n.shift();
            for (; !a && n.length === 0;) {
                let u = await t.read();
                if (u.done) {
                    a = !0;
                    break
                }
                r.push(u.value);
                try {
                    let m = i.decode(In(...r)).split(`

`);
                    if (m.length >= 2 && (n.push(...m.slice(0, -1)), r = [o.encode(m.slice(-1).join(`

`))]), n.length > 0) break
                } catch {
                    continue
                }
            }
            return n.length > 0 || r.length > 0 && (n = i.decode(In(...r)).split(`

`).filter(c => c), r = []), n.shift()
        },
        s = await l();
    for (; s;) yield s, s = await l()
}

function In(...e) {
    let t = new Uint8Array(e.reduce((n, a) => n + a.length, 0)),
        r = 0;
    for (let n of e) t.set(n, r), r += n.length;
    return t
}

function ti(e) {
    let t = {};
    return Object.values(e).forEach(r => {
        let n = r.parentId || "";
        t[n] || (t[n] = []), t[n].push(r)
    }), t
}

function br(e, t, r, n = "", a = ti(e), o) {
    return (a[n] || []).map(i => {
        let l = r.v2_errorBoundary === !0 ? i.id === "root" || i.hasErrorBoundary : i.id === "root" || i.hasCatchBoundary || i.hasErrorBoundary,
            s = {
                caseSensitive: i.caseSensitive,
                element: wr.createElement(Ln, {
                    id: i.id
                }),
                errorElement: l ? wr.createElement(Pn, {
                    id: i.id
                }) : void 0,
                id: i.id,
                index: i.index,
                path: i.path,
                handle: void 0,
                loader: zn(i, t, !1),
                action: zn(i, t, !0),
                shouldRevalidate: ri(i, t, o)
            },
            u = br(e, t, r, i.id, a, o);
        return u.length > 0 && (s.children = u), s
    })
}

function ri(e, t, r) {
    let n = !1;
    return function(a) {
        let o = t[e.id];
        return de(o, `Expected route module to be loaded for ${e.id}`), r !== void 0 && !n ? (n = !0, r.has(e.id)) : o.shouldRevalidate ? o.shouldRevalidate(a) : a.defaultShouldRevalidate
    }
}
async function ni(e, t) {
    let r = await Ft(e, t);
    return await bn(r), r
}

function zn(e, t, r) {
    return async ({
        request: n
    }) => {
        let a = ni(e, t);
        try {
            if (r && !e.hasAction) {
                let i = `Route "${e.id}" does not have an action, but you are trying to submit to it. To fix this, please add an \`action\` function to the route`;
                throw console.error(i), new Error(i)
            } else if (!r && !e.hasLoader) return null;
            let o = await Er(n, e.id);
            if (o instanceof Error) throw o;
            if (Bn(o)) throw ai(o);
            if (jn(o)) throw o;
            return Hn(o) && o.body ? await $n(o.body) : o
        } finally {
            await a
        }
    }
}

function ai(e) {
    let t = parseInt(e.headers.get("X-Remix-Status"), 10) || 302,
        r = e.headers.get("X-Remix-Redirect"),
        n = {},
        a = e.headers.get("X-Remix-Revalidate");
    return a && (n["X-Remix-Revalidate"] = a), St(r, {
        status: t,
        headers: n
    })
}
var Qe;
var xr, ul = new Promise(e => {
    xr = e
}).catch(() => {});

function oi(e) {
    if (!Qe) {
        let n = br(window.__remixManifest.routes, window.__remixRouteModules, window.__remixContext.future),
            a = window.__remixContext.state;
        a && a.errors && (a = { ...a,
            errors: kn(a.errors)
        }), Qe = hn(n, {
            hydrationData: a,
            future: {
                v7_normalizeFormMethod: window.__remixContext.future.v2_normalizeFormMethod
            }
        });
        let o = window.__remixContext.url,
            i = window.location.pathname;
        if (o !== i) {
            let l = `Initial URL (${o}) does not match URL at time of hydration (${i}), reloading page...`;
            console.error(l), window.location.reload()
        }
        xr && xr(Qe)
    }
    let [t, r] = Ce.useState(Qe.state.location);
    return Ce.useLayoutEffect(() => Qe.subscribe(n => {
        n.location !== t && r(n.location)
    }), [t]), Ce.createElement(pt.Provider, {
        value: {
            manifest: window.__remixManifest,
            routeModules: window.__remixRouteModules,
            future: window.__remixContext.future
        }
    }, Ce.createElement(At, {
        location: t,
        component: Ge
    }, Ce.createElement(sr, {
        router: Qe,
        fallbackElement: null,
        future: {
            v7_startTransition: !0
        }
    })))
}
De();
var Tt = Fe(Oe());
De();
var Vn = "positions";

function ii({
    getKey: e,
    ...t
}) {
    let r = ee(),
        n = vr();
    pn({
        getKey: e,
        storageKey: Vn
    });
    let a = Tt.useMemo(() => {
            if (!e) return null;
            let i = e(r, n);
            return i !== r.key ? i : null
        }, []),
        o = ((i, l) => {
            if (!window.history.state || !window.history.state.key) {
                let s = Math.random().toString(32).slice(2);
                window.history.replaceState({
                    key: s
                }, "")
            }
            try {
                let u = JSON.parse(sessionStorage.getItem(i) || "{}")[l || window.history.state.key];
                typeof u == "number" && window.scrollTo(0, u)
            } catch (s) {
                console.error(s), sessionStorage.removeItem(i)
            }
        }).toString();
    return Tt.createElement("script", V({}, t, {
        suppressHydrationWarning: !0,
        dangerouslySetInnerHTML: {
            __html: `(${o})(${JSON.stringify(Vn)}, ${JSON.stringify(a)})`
        }
    }))
}
export {
    he as a, ee as b, Dt as c, sn as d, ke as e, Pt as f, On as g, Io as h, Vo as i, Wo as j, Xo as k, Yo as l, oi as m, ii as n
};
/*! Bundled license information:

@remix-run/router/dist/router.js:
  (**
   * @remix-run/router v1.7.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router/dist/index.js:
  (**
   * React Router v6.14.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router-dom/dist/index.js:
  (**
   * React Router DOM v6.14.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/_virtual/_rollupPluginBabelHelpers.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/errorBoundaries.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/invariant.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/routeModules.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/links.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/markup.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/components.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/errors.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/data.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/routes.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/browser.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/scroll-restoration.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/index.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/