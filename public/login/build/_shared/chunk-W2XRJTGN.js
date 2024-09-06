var he = {
        type: "logger",
        log(i) {
            this.output("log", i)
        },
        warn(i) {
            this.output("warn", i)
        },
        error(i) {
            this.output("error", i)
        },
        output(i, e) {
            console && console[i] && console[i].apply(console, e)
        }
    },
    k = class {
        constructor(e) {
            let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            this.init(e, t)
        }
        init(e) {
            let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            this.prefix = t.prefix || "i18next:", this.logger = e || he, this.options = t, this.debug = t.debug
        }
        log() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
            return this.forward(t, "log", "", !0)
        }
        warn() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
            return this.forward(t, "warn", "", !0)
        }
        error() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
            return this.forward(t, "error", "")
        }
        deprecate() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
            return this.forward(t, "warn", "WARNING DEPRECATED: ", !0)
        }
        forward(e, t, s, n) {
            return n && !this.debug ? null : (typeof e[0] == "string" && (e[0] = `${s}${this.prefix} ${e[0]}`), this.logger[t](e))
        }
        create(e) {
            return new k(this.logger, {
                prefix: `${this.prefix}:${e}:`,
                ...this.options
            })
        }
        clone(e) {
            return e = e || this.options, e.prefix = e.prefix || this.prefix, new k(this.logger, e)
        }
    },
    N = new k,
    j = class {
        constructor() {
            this.observers = {}
        }
        on(e, t) {
            return e.split(" ").forEach(s => {
                this.observers[s] = this.observers[s] || [], this.observers[s].push(t)
            }), this
        }
        off(e, t) {
            if (this.observers[e]) {
                if (!t) {
                    delete this.observers[e];
                    return
                }
                this.observers[e] = this.observers[e].filter(s => s !== t)
            }
        }
        emit(e) {
            for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) s[n - 1] = arguments[n];
            this.observers[e] && [].concat(this.observers[e]).forEach(a => {
                a(...s)
            }), this.observers["*"] && [].concat(this.observers["*"]).forEach(a => {
                a.apply(a, [e, ...s])
            })
        }
    };

function A() {
    let i, e, t = new Promise((s, n) => {
        i = s, e = n
    });
    return t.resolve = i, t.reject = e, t
}

function te(i) {
    return i == null ? "" : "" + i
}

function ce(i, e, t) {
    i.forEach(s => {
        e[s] && (t[s] = e[s])
    })
}

function X(i, e, t) {
    function s(a) {
        return a && a.indexOf("###") > -1 ? a.replace(/###/g, ".") : a
    }

    function n() {
        return !i || typeof i == "string"
    }
    let r = typeof e != "string" ? [].concat(e) : e.split(".");
    for (; r.length > 1;) {
        if (n()) return {};
        let a = s(r.shift());
        !i[a] && t && (i[a] = new t), Object.prototype.hasOwnProperty.call(i, a) ? i = i[a] : i = {}
    }
    return n() ? {} : {
        obj: i,
        k: s(r.shift())
    }
}

function se(i, e, t) {
    let {
        obj: s,
        k: n
    } = X(i, e, Object);
    s[n] = t
}

function de(i, e, t, s) {
    let {
        obj: n,
        k: r
    } = X(i, e, Object);
    n[r] = n[r] || [], s && (n[r] = n[r].concat(t)), s || n[r].push(t)
}

function M(i, e) {
    let {
        obj: t,
        k: s
    } = X(i, e);
    if (t) return t[s]
}

function pe(i, e, t) {
    let s = M(i, t);
    return s !== void 0 ? s : M(e, t)
}

function le(i, e, t) {
    for (let s in e) s !== "__proto__" && s !== "constructor" && (s in i ? typeof i[s] == "string" || i[s] instanceof String || typeof e[s] == "string" || e[s] instanceof String ? t && (i[s] = e[s]) : le(i[s], e[s], t) : i[s] = e[s]);
    return i
}

function C(i) {
    return i.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
}
var me = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;"
};

function ye(i) {
    return typeof i == "string" ? i.replace(/[&<>"'\/]/g, e => me[e]) : i
}
var be = [" ", ",", "?", "!", ";"];

function xe(i, e, t) {
    e = e || "", t = t || "";
    let s = be.filter(a => e.indexOf(a) < 0 && t.indexOf(a) < 0);
    if (s.length === 0) return !0;
    let n = new RegExp(`(${s.map(a=>a==="?"?"\\?":a).join("|")})`),
        r = !n.test(i);
    if (!r) {
        let a = i.indexOf(t);
        a > 0 && !n.test(i.substring(0, a)) && (r = !0)
    }
    return r
}

function H(i, e) {
    let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
    if (!i) return;
    if (i[e]) return i[e];
    let s = e.split(t),
        n = i;
    for (let r = 0; r < s.length; ++r) {
        if (!n || typeof n[s[r]] == "string" && r + 1 < s.length) return;
        if (n[s[r]] === void 0) {
            let a = 2,
                l = s.slice(r, r + a).join(t),
                o = n[l];
            for (; o === void 0 && s.length > r + a;) a++, l = s.slice(r, r + a).join(t), o = n[l];
            if (o === void 0) return;
            if (o === null) return null;
            if (e.endsWith(l)) {
                if (typeof o == "string") return o;
                if (l && typeof o[l] == "string") return o[l]
            }
            let f = s.slice(r + a).join(t);
            return f ? H(o, f, t) : void 0
        }
        n = n[s[r]]
    }
    return n
}

function J(i) {
    return i && i.indexOf("_") > 0 ? i.replace("_", "-") : i
}
var B = class extends j {
        constructor(e) {
            let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                ns: ["translation"],
                defaultNS: "translation"
            };
            super(), this.data = e || {}, this.options = t, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0)
        }
        addNamespaces(e) {
            this.options.ns.indexOf(e) < 0 && this.options.ns.push(e)
        }
        removeNamespaces(e) {
            let t = this.options.ns.indexOf(e);
            t > -1 && this.options.ns.splice(t, 1)
        }
        getResource(e, t, s) {
            let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
                r = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator,
                a = n.ignoreJSONStructure !== void 0 ? n.ignoreJSONStructure : this.options.ignoreJSONStructure,
                l = [e, t];
            s && typeof s != "string" && (l = l.concat(s)), s && typeof s == "string" && (l = l.concat(r ? s.split(r) : s)), e.indexOf(".") > -1 && (l = e.split("."));
            let o = M(this.data, l);
            return o || !a || typeof s != "string" ? o : H(this.data && this.data[e] && this.data[e][t], s, r)
        }
        addResource(e, t, s, n) {
            let r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
                    silent: !1
                },
                a = r.keySeparator !== void 0 ? r.keySeparator : this.options.keySeparator,
                l = [e, t];
            s && (l = l.concat(a ? s.split(a) : s)), e.indexOf(".") > -1 && (l = e.split("."), n = t, t = l[1]), this.addNamespaces(t), se(this.data, l, n), r.silent || this.emit("added", e, t, s, n)
        }
        addResources(e, t, s) {
            let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
                silent: !1
            };
            for (let r in s)(typeof s[r] == "string" || Object.prototype.toString.apply(s[r]) === "[object Array]") && this.addResource(e, t, r, s[r], {
                silent: !0
            });
            n.silent || this.emit("added", e, t, s)
        }
        addResourceBundle(e, t, s, n, r) {
            let a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {
                    silent: !1
                },
                l = [e, t];
            e.indexOf(".") > -1 && (l = e.split("."), n = s, s = t, t = l[1]), this.addNamespaces(t);
            let o = M(this.data, l) || {};
            n ? le(o, s, r) : o = { ...o,
                ...s
            }, se(this.data, l, o), a.silent || this.emit("added", e, t, s)
        }
        removeResourceBundle(e, t) {
            this.hasResourceBundle(e, t) && delete this.data[e][t], this.removeNamespaces(t), this.emit("removed", e, t)
        }
        hasResourceBundle(e, t) {
            return this.getResource(e, t) !== void 0
        }
        getResourceBundle(e, t) {
            return t || (t = this.options.defaultNS), this.options.compatibilityAPI === "v1" ? { ...this.getResource(e, t)
            } : this.getResource(e, t)
        }
        getDataByLanguage(e) {
            return this.data[e]
        }
        hasLanguageSomeTranslations(e) {
            let t = this.getDataByLanguage(e);
            return !!(t && Object.keys(t) || []).find(n => t[n] && Object.keys(t[n]).length > 0)
        }
        toJSON() {
            return this.data
        }
    },
    ue = {
        processors: {},
        addPostProcessor(i) {
            this.processors[i.name] = i
        },
        handle(i, e, t, s, n) {
            return i.forEach(r => {
                this.processors[r] && (e = this.processors[r].process(e, t, s, n))
            }), e
        }
    },
    ne = {},
    F = class extends j {
        constructor(e) {
            let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            super(), ce(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, this), this.options = t, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = N.create("translator")
        }
        changeLanguage(e) {
            e && (this.language = e)
        }
        exists(e) {
            let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                interpolation: {}
            };
            if (e == null) return !1;
            let s = this.resolve(e, t);
            return s && s.res !== void 0
        }
        extractFromKey(e, t) {
            let s = t.nsSeparator !== void 0 ? t.nsSeparator : this.options.nsSeparator;
            s === void 0 && (s = ":");
            let n = t.keySeparator !== void 0 ? t.keySeparator : this.options.keySeparator,
                r = t.ns || this.options.defaultNS || [],
                a = s && e.indexOf(s) > -1,
                l = !this.options.userDefinedKeySeparator && !t.keySeparator && !this.options.userDefinedNsSeparator && !t.nsSeparator && !xe(e, s, n);
            if (a && !l) {
                let o = e.match(this.interpolator.nestingRegexp);
                if (o && o.length > 0) return {
                    key: e,
                    namespaces: r
                };
                let f = e.split(s);
                (s !== n || s === n && this.options.ns.indexOf(f[0]) > -1) && (r = f.shift()), e = f.join(n)
            }
            return typeof r == "string" && (r = [r]), {
                key: e,
                namespaces: r
            }
        }
        translate(e, t, s) {
            if (typeof t != "object" && this.options.overloadTranslationOptionHandler && (t = this.options.overloadTranslationOptionHandler(arguments)), typeof t == "object" && (t = { ...t
                }), t || (t = {}), e == null) return "";
            Array.isArray(e) || (e = [String(e)]);
            let n = t.returnDetails !== void 0 ? t.returnDetails : this.options.returnDetails,
                r = t.keySeparator !== void 0 ? t.keySeparator : this.options.keySeparator,
                {
                    key: a,
                    namespaces: l
                } = this.extractFromKey(e[e.length - 1], t),
                o = l[l.length - 1],
                f = t.lng || this.language,
                g = t.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
            if (f && f.toLowerCase() === "cimode") {
                if (g) {
                    let y = t.nsSeparator || this.options.nsSeparator;
                    return n ? {
                        res: `${o}${y}${a}`,
                        usedKey: a,
                        exactUsedKey: a,
                        usedLng: f,
                        usedNS: o,
                        usedParams: this.getUsedParamsDetails(t)
                    } : `${o}${y}${a}`
                }
                return n ? {
                    res: a,
                    usedKey: a,
                    exactUsedKey: a,
                    usedLng: f,
                    usedNS: o,
                    usedParams: this.getUsedParamsDetails(t)
                } : a
            }
            let h = this.resolve(e, t),
                u = h && h.res,
                d = h && h.usedKey || a,
                c = h && h.exactUsedKey || a,
                p = Object.prototype.toString.apply(u),
                m = ["[object Number]", "[object Function]", "[object RegExp]"],
                L = t.joinArrays !== void 0 ? t.joinArrays : this.options.joinArrays,
                b = !this.i18nFormat || this.i18nFormat.handleAsObject;
            if (b && u && (typeof u != "string" && typeof u != "boolean" && typeof u != "number") && m.indexOf(p) < 0 && !(typeof L == "string" && p === "[object Array]")) {
                if (!t.returnObjects && !this.options.returnObjects) {
                    this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
                    let y = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(d, u, { ...t,
                        ns: l
                    }) : `key '${a} (${this.language})' returned an object instead of string.`;
                    return n ? (h.res = y, h.usedParams = this.getUsedParamsDetails(t), h) : y
                }
                if (r) {
                    let y = p === "[object Array]",
                        v = y ? [] : {},
                        w = y ? c : d;
                    for (let x in u)
                        if (Object.prototype.hasOwnProperty.call(u, x)) {
                            let T = `${w}${r}${x}`;
                            v[x] = this.translate(T, { ...t,
                                joinArrays: !1,
                                ns: l
                            }), v[x] === T && (v[x] = u[x])
                        }
                    u = v
                }
            } else if (b && typeof L == "string" && p === "[object Array]") u = u.join(L), u && (u = this.extendTranslation(u, e, t, s));
            else {
                let y = !1,
                    v = !1,
                    w = t.count !== void 0 && typeof t.count != "string",
                    x = F.hasDefaultValue(t),
                    T = w ? this.pluralResolver.getSuffix(f, t.count, t) : "",
                    fe = t.ordinal && w ? this.pluralResolver.getSuffix(f, t.count, {
                        ordinal: !1
                    }) : "",
                    E = t[`defaultValue${T}`] || t[`defaultValue${fe}`] || t.defaultValue;
                !this.isValidLookup(u) && x && (y = !0, u = E), this.isValidLookup(u) || (v = !0, u = a);
                let ge = (t.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && v ? void 0 : u,
                    I = x && E !== u && this.options.updateMissing;
                if (v || y || I) {
                    if (this.logger.log(I ? "updateKey" : "missingKey", f, o, a, I ? E : u), r) {
                        let O = this.resolve(a, { ...t,
                            keySeparator: !1
                        });
                        O && O.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")
                    }
                    let D = [],
                        K = this.languageUtils.getFallbackCodes(this.options.fallbackLng, t.lng || this.language);
                    if (this.options.saveMissingTo === "fallback" && K && K[0])
                        for (let O = 0; O < K.length; O++) D.push(K[O]);
                    else this.options.saveMissingTo === "all" ? D = this.languageUtils.toResolveHierarchy(t.lng || this.language) : D.push(t.lng || this.language);
                    let q = (O, P, _) => {
                        let ee = x && _ !== u ? _ : ge;
                        this.options.missingKeyHandler ? this.options.missingKeyHandler(O, o, P, ee, I, t) : this.backendConnector && this.backendConnector.saveMissing && this.backendConnector.saveMissing(O, o, P, ee, I, t), this.emit("missingKey", O, o, P, u)
                    };
                    this.options.saveMissing && (this.options.saveMissingPlurals && w ? D.forEach(O => {
                        this.pluralResolver.getSuffixes(O, t).forEach(P => {
                            q([O], a + P, t[`defaultValue${P}`] || E)
                        })
                    }) : q(D, a, E))
                }
                u = this.extendTranslation(u, e, t, h, s), v && u === a && this.options.appendNamespaceToMissingKey && (u = `${o}:${a}`), (v || y) && this.options.parseMissingKeyHandler && (this.options.compatibilityAPI !== "v1" ? u = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${o}:${a}` : a, y ? u : void 0) : u = this.options.parseMissingKeyHandler(u))
            }
            return n ? (h.res = u, h.usedParams = this.getUsedParamsDetails(t), h) : u
        }
        extendTranslation(e, t, s, n, r) {
            var a = this;
            if (this.i18nFormat && this.i18nFormat.parse) e = this.i18nFormat.parse(e, { ...this.options.interpolation.defaultVariables,
                ...s
            }, s.lng || this.language || n.usedLng, n.usedNS, n.usedKey, {
                resolved: n
            });
            else if (!s.skipInterpolation) {
                s.interpolation && this.interpolator.init({ ...s,
                    interpolation: { ...this.options.interpolation,
                        ...s.interpolation
                    }
                });
                let f = typeof e == "string" && (s && s.interpolation && s.interpolation.skipOnVariables !== void 0 ? s.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables),
                    g;
                if (f) {
                    let u = e.match(this.interpolator.nestingRegexp);
                    g = u && u.length
                }
                let h = s.replace && typeof s.replace != "string" ? s.replace : s;
                if (this.options.interpolation.defaultVariables && (h = { ...this.options.interpolation.defaultVariables,
                        ...h
                    }), e = this.interpolator.interpolate(e, h, s.lng || this.language, s), f) {
                    let u = e.match(this.interpolator.nestingRegexp),
                        d = u && u.length;
                    g < d && (s.nest = !1)
                }!s.lng && this.options.compatibilityAPI !== "v1" && n && n.res && (s.lng = n.usedLng), s.nest !== !1 && (e = this.interpolator.nest(e, function() {
                    for (var u = arguments.length, d = new Array(u), c = 0; c < u; c++) d[c] = arguments[c];
                    return r && r[0] === d[0] && !s.context ? (a.logger.warn(`It seems you are nesting recursively key: ${d[0]} in key: ${t[0]}`), null) : a.translate(...d, t)
                }, s)), s.interpolation && this.interpolator.reset()
            }
            let l = s.postProcess || this.options.postProcess,
                o = typeof l == "string" ? [l] : l;
            return e != null && o && o.length && s.applyPostProcessor !== !1 && (e = ue.handle(o, e, t, this.options && this.options.postProcessPassResolved ? {
                i18nResolved: { ...n,
                    usedParams: this.getUsedParamsDetails(s)
                },
                ...s
            } : s, this)), e
        }
        resolve(e) {
            let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
                s, n, r, a, l;
            return typeof e == "string" && (e = [e]), e.forEach(o => {
                if (this.isValidLookup(s)) return;
                let f = this.extractFromKey(o, t),
                    g = f.key;
                n = g;
                let h = f.namespaces;
                this.options.fallbackNS && (h = h.concat(this.options.fallbackNS));
                let u = t.count !== void 0 && typeof t.count != "string",
                    d = u && !t.ordinal && t.count === 0 && this.pluralResolver.shouldUseIntlApi(),
                    c = t.context !== void 0 && (typeof t.context == "string" || typeof t.context == "number") && t.context !== "",
                    p = t.lngs ? t.lngs : this.languageUtils.toResolveHierarchy(t.lng || this.language, t.fallbackLng);
                h.forEach(m => {
                    this.isValidLookup(s) || (l = m, !ne[`${p[0]}-${m}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(l) && (ne[`${p[0]}-${m}`] = !0, this.logger.warn(`key "${n}" for languages "${p.join(", ")}" won't get resolved as namespace "${l}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), p.forEach(L => {
                        if (this.isValidLookup(s)) return;
                        a = L;
                        let b = [g];
                        if (this.i18nFormat && this.i18nFormat.addLookupKeys) this.i18nFormat.addLookupKeys(b, g, L, m, t);
                        else {
                            let y;
                            u && (y = this.pluralResolver.getSuffix(L, t.count, t));
                            let v = `${this.options.pluralSeparator}zero`,
                                w = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
                            if (u && (b.push(g + y), t.ordinal && y.indexOf(w) === 0 && b.push(g + y.replace(w, this.options.pluralSeparator)), d && b.push(g + v)), c) {
                                let x = `${g}${this.options.contextSeparator}${t.context}`;
                                b.push(x), u && (b.push(x + y), t.ordinal && y.indexOf(w) === 0 && b.push(x + y.replace(w, this.options.pluralSeparator)), d && b.push(x + v))
                            }
                        }
                        let V;
                        for (; V = b.pop();) this.isValidLookup(s) || (r = V, s = this.getResource(L, m, V, t))
                    }))
                })
            }), {
                res: s,
                usedKey: n,
                exactUsedKey: r,
                usedLng: a,
                usedNS: l
            }
        }
        isValidLookup(e) {
            return e !== void 0 && !(!this.options.returnNull && e === null) && !(!this.options.returnEmptyString && e === "")
        }
        getResource(e, t, s) {
            let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
            return this.i18nFormat && this.i18nFormat.getResource ? this.i18nFormat.getResource(e, t, s, n) : this.resourceStore.getResource(e, t, s, n)
        }
        getUsedParamsDetails() {
            let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
                t = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"],
                s = e.replace && typeof e.replace != "string",
                n = s ? e.replace : e;
            if (s && typeof e.count < "u" && (n.count = e.count), this.options.interpolation.defaultVariables && (n = { ...this.options.interpolation.defaultVariables,
                    ...n
                }), !s) {
                n = { ...n
                };
                for (let r of t) delete n[r]
            }
            return n
        }
        static hasDefaultValue(e) {
            let t = "defaultValue";
            for (let s in e)
                if (Object.prototype.hasOwnProperty.call(e, s) && t === s.substring(0, t.length) && e[s] !== void 0) return !0;
            return !1
        }
    };

function W(i) {
    return i.charAt(0).toUpperCase() + i.slice(1)
}
var z = class {
        constructor(e) {
            this.options = e, this.supportedLngs = this.options.supportedLngs || !1, this.logger = N.create("languageUtils")
        }
        getScriptPartFromCode(e) {
            if (e = J(e), !e || e.indexOf("-") < 0) return null;
            let t = e.split("-");
            return t.length === 2 || (t.pop(), t[t.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(t.join("-"))
        }
        getLanguagePartFromCode(e) {
            if (e = J(e), !e || e.indexOf("-") < 0) return e;
            let t = e.split("-");
            return this.formatLanguageCode(t[0])
        }
        formatLanguageCode(e) {
            if (typeof e == "string" && e.indexOf("-") > -1) {
                let t = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"],
                    s = e.split("-");
                return this.options.lowerCaseLng ? s = s.map(n => n.toLowerCase()) : s.length === 2 ? (s[0] = s[0].toLowerCase(), s[1] = s[1].toUpperCase(), t.indexOf(s[1].toLowerCase()) > -1 && (s[1] = W(s[1].toLowerCase()))) : s.length === 3 && (s[0] = s[0].toLowerCase(), s[1].length === 2 && (s[1] = s[1].toUpperCase()), s[0] !== "sgn" && s[2].length === 2 && (s[2] = s[2].toUpperCase()), t.indexOf(s[1].toLowerCase()) > -1 && (s[1] = W(s[1].toLowerCase())), t.indexOf(s[2].toLowerCase()) > -1 && (s[2] = W(s[2].toLowerCase()))), s.join("-")
            }
            return this.options.cleanCode || this.options.lowerCaseLng ? e.toLowerCase() : e
        }
        isSupportedCode(e) {
            return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (e = this.getLanguagePartFromCode(e)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(e) > -1
        }
        getBestMatchFromCodes(e) {
            if (!e) return null;
            let t;
            return e.forEach(s => {
                if (t) return;
                let n = this.formatLanguageCode(s);
                (!this.options.supportedLngs || this.isSupportedCode(n)) && (t = n)
            }), !t && this.options.supportedLngs && e.forEach(s => {
                if (t) return;
                let n = this.getLanguagePartFromCode(s);
                if (this.isSupportedCode(n)) return t = n;
                t = this.options.supportedLngs.find(r => {
                    if (r === n) return r;
                    if (!(r.indexOf("-") < 0 && n.indexOf("-") < 0) && r.indexOf(n) === 0) return r
                })
            }), t || (t = this.getFallbackCodes(this.options.fallbackLng)[0]), t
        }
        getFallbackCodes(e, t) {
            if (!e) return [];
            if (typeof e == "function" && (e = e(t)), typeof e == "string" && (e = [e]), Object.prototype.toString.apply(e) === "[object Array]") return e;
            if (!t) return e.default || [];
            let s = e[t];
            return s || (s = e[this.getScriptPartFromCode(t)]), s || (s = e[this.formatLanguageCode(t)]), s || (s = e[this.getLanguagePartFromCode(t)]), s || (s = e.default), s || []
        }
        toResolveHierarchy(e, t) {
            let s = this.getFallbackCodes(t || this.options.fallbackLng || [], e),
                n = [],
                r = a => {
                    a && (this.isSupportedCode(a) ? n.push(a) : this.logger.warn(`rejecting language code not found in supportedLngs: ${a}`))
                };
            return typeof e == "string" && (e.indexOf("-") > -1 || e.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && r(this.formatLanguageCode(e)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && r(this.getScriptPartFromCode(e)), this.options.load !== "currentOnly" && r(this.getLanguagePartFromCode(e))) : typeof e == "string" && r(this.formatLanguageCode(e)), s.forEach(a => {
                n.indexOf(a) < 0 && r(this.formatLanguageCode(a))
            }), n
        }
    },
    Se = [{
        lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "pt", "pt-BR", "tg", "tl", "ti", "tr", "uz", "wa"],
        nr: [1, 2],
        fc: 1
    }, {
        lngs: ["af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "hi", "hu", "hy", "ia", "it", "kk", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt-PT", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo"],
        nr: [1, 2],
        fc: 2
    }, {
        lngs: ["ay", "bo", "cgg", "fa", "ht", "id", "ja", "jbo", "ka", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"],
        nr: [1],
        fc: 3
    }, {
        lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"],
        nr: [1, 2, 5],
        fc: 4
    }, {
        lngs: ["ar"],
        nr: [0, 1, 2, 3, 11, 100],
        fc: 5
    }, {
        lngs: ["cs", "sk"],
        nr: [1, 2, 5],
        fc: 6
    }, {
        lngs: ["csb", "pl"],
        nr: [1, 2, 5],
        fc: 7
    }, {
        lngs: ["cy"],
        nr: [1, 2, 3, 8],
        fc: 8
    }, {
        lngs: ["fr"],
        nr: [1, 2],
        fc: 9
    }, {
        lngs: ["ga"],
        nr: [1, 2, 3, 7, 11],
        fc: 10
    }, {
        lngs: ["gd"],
        nr: [1, 2, 3, 20],
        fc: 11
    }, {
        lngs: ["is"],
        nr: [1, 2],
        fc: 12
    }, {
        lngs: ["jv"],
        nr: [0, 1],
        fc: 13
    }, {
        lngs: ["kw"],
        nr: [1, 2, 3, 4],
        fc: 14
    }, {
        lngs: ["lt"],
        nr: [1, 2, 10],
        fc: 15
    }, {
        lngs: ["lv"],
        nr: [1, 2, 0],
        fc: 16
    }, {
        lngs: ["mk"],
        nr: [1, 2],
        fc: 17
    }, {
        lngs: ["mnk"],
        nr: [0, 1, 2],
        fc: 18
    }, {
        lngs: ["mt"],
        nr: [1, 2, 11, 20],
        fc: 19
    }, {
        lngs: ["or"],
        nr: [2, 1],
        fc: 2
    }, {
        lngs: ["ro"],
        nr: [1, 2, 20],
        fc: 20
    }, {
        lngs: ["sl"],
        nr: [5, 1, 2, 3],
        fc: 21
    }, {
        lngs: ["he", "iw"],
        nr: [1, 2, 20, 21],
        fc: 22
    }],
    Le = {
        1: function(i) {
            return Number(i > 1)
        },
        2: function(i) {
            return Number(i != 1)
        },
        3: function(i) {
            return 0
        },
        4: function(i) {
            return Number(i % 10 == 1 && i % 100 != 11 ? 0 : i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 10 || i % 100 >= 20) ? 1 : 2)
        },
        5: function(i) {
            return Number(i == 0 ? 0 : i == 1 ? 1 : i == 2 ? 2 : i % 100 >= 3 && i % 100 <= 10 ? 3 : i % 100 >= 11 ? 4 : 5)
        },
        6: function(i) {
            return Number(i == 1 ? 0 : i >= 2 && i <= 4 ? 1 : 2)
        },
        7: function(i) {
            return Number(i == 1 ? 0 : i % 10 >= 2 && i % 10 <= 4 && (i % 100 < 10 || i % 100 >= 20) ? 1 : 2)
        },
        8: function(i) {
            return Number(i == 1 ? 0 : i == 2 ? 1 : i != 8 && i != 11 ? 2 : 3)
        },
        9: function(i) {
            return Number(i >= 2)
        },
        10: function(i) {
            return Number(i == 1 ? 0 : i == 2 ? 1 : i < 7 ? 2 : i < 11 ? 3 : 4)
        },
        11: function(i) {
            return Number(i == 1 || i == 11 ? 0 : i == 2 || i == 12 ? 1 : i > 2 && i < 20 ? 2 : 3)
        },
        12: function(i) {
            return Number(i % 10 != 1 || i % 100 == 11)
        },
        13: function(i) {
            return Number(i !== 0)
        },
        14: function(i) {
            return Number(i == 1 ? 0 : i == 2 ? 1 : i == 3 ? 2 : 3)
        },
        15: function(i) {
            return Number(i % 10 == 1 && i % 100 != 11 ? 0 : i % 10 >= 2 && (i % 100 < 10 || i % 100 >= 20) ? 1 : 2)
        },
        16: function(i) {
            return Number(i % 10 == 1 && i % 100 != 11 ? 0 : i !== 0 ? 1 : 2)
        },
        17: function(i) {
            return Number(i == 1 || i % 10 == 1 && i % 100 != 11 ? 0 : 1)
        },
        18: function(i) {
            return Number(i == 0 ? 0 : i == 1 ? 1 : 2)
        },
        19: function(i) {
            return Number(i == 1 ? 0 : i == 0 || i % 100 > 1 && i % 100 < 11 ? 1 : i % 100 > 10 && i % 100 < 20 ? 2 : 3)
        },
        20: function(i) {
            return Number(i == 1 ? 0 : i == 0 || i % 100 > 0 && i % 100 < 20 ? 1 : 2)
        },
        21: function(i) {
            return Number(i % 100 == 1 ? 1 : i % 100 == 2 ? 2 : i % 100 == 3 || i % 100 == 4 ? 3 : 0)
        },
        22: function(i) {
            return Number(i == 1 ? 0 : i == 2 ? 1 : (i < 0 || i > 10) && i % 10 == 0 ? 2 : 3)
        }
    },
    ve = ["v1", "v2", "v3"],
    Oe = ["v4"],
    ie = {
        zero: 0,
        one: 1,
        two: 2,
        few: 3,
        many: 4,
        other: 5
    };

function we() {
    let i = {};
    return Se.forEach(e => {
        e.lngs.forEach(t => {
            i[t] = {
                numbers: e.nr,
                plurals: Le[e.fc]
            }
        })
    }), i
}
var Y = class {
    constructor(e) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        this.languageUtils = e, this.options = t, this.logger = N.create("pluralResolver"), (!this.options.compatibilityJSON || Oe.includes(this.options.compatibilityJSON)) && (typeof Intl > "u" || !Intl.PluralRules) && (this.options.compatibilityJSON = "v3", this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")), this.rules = we()
    }
    addRule(e, t) {
        this.rules[e] = t
    }
    getRule(e) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        if (this.shouldUseIntlApi()) try {
            return new Intl.PluralRules(J(e), {
                type: t.ordinal ? "ordinal" : "cardinal"
            })
        } catch {
            return
        }
        return this.rules[e] || this.rules[this.languageUtils.getLanguagePartFromCode(e)]
    }
    needsPlural(e) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
            s = this.getRule(e, t);
        return this.shouldUseIntlApi() ? s && s.resolvedOptions().pluralCategories.length > 1 : s && s.numbers.length > 1
    }
    getPluralFormsOfKey(e, t) {
        let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        return this.getSuffixes(e, s).map(n => `${t}${n}`)
    }
    getSuffixes(e) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
            s = this.getRule(e, t);
        return s ? this.shouldUseIntlApi() ? s.resolvedOptions().pluralCategories.sort((n, r) => ie[n] - ie[r]).map(n => `${this.options.prepend}${t.ordinal?`ordinal${this.options.prepend}`:""}${n}`) : s.numbers.map(n => this.getSuffix(e, n, t)) : []
    }
    getSuffix(e, t) {
        let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
            n = this.getRule(e, s);
        return n ? this.shouldUseIntlApi() ? `${this.options.prepend}${s.ordinal?`ordinal${this.options.prepend}`:""}${n.select(t)}` : this.getSuffixRetroCompatible(n, t) : (this.logger.warn(`no plural rule found for: ${e}`), "")
    }
    getSuffixRetroCompatible(e, t) {
        let s = e.noAbs ? e.plurals(t) : e.plurals(Math.abs(t)),
            n = e.numbers[s];
        this.options.simplifyPluralSuffix && e.numbers.length === 2 && e.numbers[0] === 1 && (n === 2 ? n = "plural" : n === 1 && (n = ""));
        let r = () => this.options.prepend && n.toString() ? this.options.prepend + n.toString() : n.toString();
        return this.options.compatibilityJSON === "v1" ? n === 1 ? "" : typeof n == "number" ? `_plural_${n.toString()}` : r() : this.options.compatibilityJSON === "v2" || this.options.simplifyPluralSuffix && e.numbers.length === 2 && e.numbers[0] === 1 ? r() : this.options.prepend && s.toString() ? this.options.prepend + s.toString() : s.toString()
    }
    shouldUseIntlApi() {
        return !ve.includes(this.options.compatibilityJSON)
    }
};

function re(i, e, t) {
    let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".",
        n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0,
        r = pe(i, e, t);
    return !r && n && typeof t == "string" && (r = H(i, t, s), r === void 0 && (r = H(e, t, s))), r
}
var G = class {
    constructor() {
        let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        this.logger = N.create("interpolator"), this.options = e, this.format = e.interpolation && e.interpolation.format || (t => t), this.init(e)
    }
    init() {
        let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        e.interpolation || (e.interpolation = {
            escapeValue: !0
        });
        let t = e.interpolation;
        this.escape = t.escape !== void 0 ? t.escape : ye, this.escapeValue = t.escapeValue !== void 0 ? t.escapeValue : !0, this.useRawValueToEscape = t.useRawValueToEscape !== void 0 ? t.useRawValueToEscape : !1, this.prefix = t.prefix ? C(t.prefix) : t.prefixEscaped || "{{", this.suffix = t.suffix ? C(t.suffix) : t.suffixEscaped || "}}", this.formatSeparator = t.formatSeparator ? t.formatSeparator : t.formatSeparator || ",", this.unescapePrefix = t.unescapeSuffix ? "" : t.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : t.unescapeSuffix || "", this.nestingPrefix = t.nestingPrefix ? C(t.nestingPrefix) : t.nestingPrefixEscaped || C("$t("), this.nestingSuffix = t.nestingSuffix ? C(t.nestingSuffix) : t.nestingSuffixEscaped || C(")"), this.nestingOptionsSeparator = t.nestingOptionsSeparator ? t.nestingOptionsSeparator : t.nestingOptionsSeparator || ",", this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3, this.alwaysFormat = t.alwaysFormat !== void 0 ? t.alwaysFormat : !1, this.resetRegExp()
    }
    reset() {
        this.options && this.init(this.options)
    }
    resetRegExp() {
        let e = `${this.prefix}(.+?)${this.suffix}`;
        this.regexp = new RegExp(e, "g");
        let t = `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`;
        this.regexpUnescape = new RegExp(t, "g");
        let s = `${this.nestingPrefix}(.+?)${this.nestingSuffix}`;
        this.nestingRegexp = new RegExp(s, "g")
    }
    interpolate(e, t, s, n) {
        let r, a, l, o = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};

        function f(c) {
            return c.replace(/\$/g, "$$$$")
        }
        let g = c => {
            if (c.indexOf(this.formatSeparator) < 0) {
                let b = re(t, o, c, this.options.keySeparator, this.options.ignoreJSONStructure);
                return this.alwaysFormat ? this.format(b, void 0, s, { ...n,
                    ...t,
                    interpolationkey: c
                }) : b
            }
            let p = c.split(this.formatSeparator),
                m = p.shift().trim(),
                L = p.join(this.formatSeparator).trim();
            return this.format(re(t, o, m, this.options.keySeparator, this.options.ignoreJSONStructure), L, s, { ...n,
                ...t,
                interpolationkey: m
            })
        };
        this.resetRegExp();
        let h = n && n.missingInterpolationHandler || this.options.missingInterpolationHandler,
            u = n && n.interpolation && n.interpolation.skipOnVariables !== void 0 ? n.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
        return [{
            regex: this.regexpUnescape,
            safeValue: c => f(c)
        }, {
            regex: this.regexp,
            safeValue: c => this.escapeValue ? f(this.escape(c)) : f(c)
        }].forEach(c => {
            for (l = 0; r = c.regex.exec(e);) {
                let p = r[1].trim();
                if (a = g(p), a === void 0)
                    if (typeof h == "function") {
                        let L = h(e, r, n);
                        a = typeof L == "string" ? L : ""
                    } else if (n && Object.prototype.hasOwnProperty.call(n, p)) a = "";
                else if (u) {
                    a = r[0];
                    continue
                } else this.logger.warn(`missed to pass in variable ${p} for interpolating ${e}`), a = "";
                else typeof a != "string" && !this.useRawValueToEscape && (a = te(a));
                let m = c.safeValue(a);
                if (e = e.replace(r[0], m), u ? (c.regex.lastIndex += a.length, c.regex.lastIndex -= r[0].length) : c.regex.lastIndex = 0, l++, l >= this.maxReplaces) break
            }
        }), e
    }
    nest(e, t) {
        let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
            n, r, a;

        function l(o, f) {
            let g = this.nestingOptionsSeparator;
            if (o.indexOf(g) < 0) return o;
            let h = o.split(new RegExp(`${g}[ ]*{`)),
                u = `{${h[1]}`;
            o = h[0], u = this.interpolate(u, a);
            let d = u.match(/'/g),
                c = u.match(/"/g);
            (d && d.length % 2 === 0 && !c || c.length % 2 !== 0) && (u = u.replace(/'/g, '"'));
            try {
                a = JSON.parse(u), f && (a = { ...f,
                    ...a
                })
            } catch (p) {
                return this.logger.warn(`failed parsing options string in nesting for key ${o}`, p), `${o}${g}${u}`
            }
            return delete a.defaultValue, o
        }
        for (; n = this.nestingRegexp.exec(e);) {
            let o = [];
            a = { ...s
            }, a = a.replace && typeof a.replace != "string" ? a.replace : a, a.applyPostProcessor = !1, delete a.defaultValue;
            let f = !1;
            if (n[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(n[1])) {
                let g = n[1].split(this.formatSeparator).map(h => h.trim());
                n[1] = g.shift(), o = g, f = !0
            }
            if (r = t(l.call(this, n[1].trim(), a), a), r && n[0] === e && typeof r != "string") return r;
            typeof r != "string" && (r = te(r)), r || (this.logger.warn(`missed to resolve ${n[1]} for nesting ${e}`), r = ""), f && (r = o.reduce((g, h) => this.format(g, h, s.lng, { ...s,
                interpolationkey: n[1].trim()
            }), r.trim())), e = e.replace(n[0], r), this.regexp.lastIndex = 0
        }
        return e
    }
};

function Ne(i) {
    let e = i.toLowerCase().trim(),
        t = {};
    if (i.indexOf("(") > -1) {
        let s = i.split("(");
        e = s[0].toLowerCase().trim();
        let n = s[1].substring(0, s[1].length - 1);
        e === "currency" && n.indexOf(":") < 0 ? t.currency || (t.currency = n.trim()) : e === "relativetime" && n.indexOf(":") < 0 ? t.range || (t.range = n.trim()) : n.split(";").forEach(a => {
            if (!a) return;
            let [l, ...o] = a.split(":"), f = o.join(":").trim().replace(/^'+|'+$/g, "");
            t[l.trim()] || (t[l.trim()] = f), f === "false" && (t[l.trim()] = !1), f === "true" && (t[l.trim()] = !0), isNaN(f) || (t[l.trim()] = parseInt(f, 10))
        })
    }
    return {
        formatName: e,
        formatOptions: t
    }
}

function $(i) {
    let e = {};
    return function(s, n, r) {
        let a = n + JSON.stringify(r),
            l = e[a];
        return l || (l = i(J(n), r), e[a] = l), l(s)
    }
}
var Q = class {
    constructor() {
        let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        this.logger = N.create("formatter"), this.options = e, this.formats = {
            number: $((t, s) => {
                let n = new Intl.NumberFormat(t, { ...s
                });
                return r => n.format(r)
            }),
            currency: $((t, s) => {
                let n = new Intl.NumberFormat(t, { ...s,
                    style: "currency"
                });
                return r => n.format(r)
            }),
            datetime: $((t, s) => {
                let n = new Intl.DateTimeFormat(t, { ...s
                });
                return r => n.format(r)
            }),
            relativetime: $((t, s) => {
                let n = new Intl.RelativeTimeFormat(t, { ...s
                });
                return r => n.format(r, s.range || "day")
            }),
            list: $((t, s) => {
                let n = new Intl.ListFormat(t, { ...s
                });
                return r => n.format(r)
            })
        }, this.init(e)
    }
    init(e) {
        let s = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
            interpolation: {}
        }).interpolation;
        this.formatSeparator = s.formatSeparator ? s.formatSeparator : s.formatSeparator || ","
    }
    add(e, t) {
        this.formats[e.toLowerCase().trim()] = t
    }
    addCached(e, t) {
        this.formats[e.toLowerCase().trim()] = $(t)
    }
    format(e, t, s) {
        let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
        return t.split(this.formatSeparator).reduce((l, o) => {
            let {
                formatName: f,
                formatOptions: g
            } = Ne(o);
            if (this.formats[f]) {
                let h = l;
                try {
                    let u = n && n.formatParams && n.formatParams[n.interpolationkey] || {},
                        d = u.locale || u.lng || n.locale || n.lng || s;
                    h = this.formats[f](l, d, { ...g,
                        ...n,
                        ...u
                    })
                } catch (u) {
                    this.logger.warn(u)
                }
                return h
            } else this.logger.warn(`there was no format function for ${f}`);
            return l
        }, e)
    }
};

function Re(i, e) {
    i.pending[e] !== void 0 && (delete i.pending[e], i.pendingCount--)
}
var Z = class extends j {
    constructor(e, t, s) {
        let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
        super(), this.backend = e, this.store = t, this.services = s, this.languageUtils = s.languageUtils, this.options = n, this.logger = N.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = n.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = n.maxRetries >= 0 ? n.maxRetries : 5, this.retryTimeout = n.retryTimeout >= 1 ? n.retryTimeout : 350, this.state = {}, this.queue = [], this.backend && this.backend.init && this.backend.init(s, n.backend, n)
    }
    queueLoad(e, t, s, n) {
        let r = {},
            a = {},
            l = {},
            o = {};
        return e.forEach(f => {
            let g = !0;
            t.forEach(h => {
                let u = `${f}|${h}`;
                !s.reload && this.store.hasResourceBundle(f, h) ? this.state[u] = 2 : this.state[u] < 0 || (this.state[u] === 1 ? a[u] === void 0 && (a[u] = !0) : (this.state[u] = 1, g = !1, a[u] === void 0 && (a[u] = !0), r[u] === void 0 && (r[u] = !0), o[h] === void 0 && (o[h] = !0)))
            }), g || (l[f] = !0)
        }), (Object.keys(r).length || Object.keys(a).length) && this.queue.push({
            pending: a,
            pendingCount: Object.keys(a).length,
            loaded: {},
            errors: [],
            callback: n
        }), {
            toLoad: Object.keys(r),
            pending: Object.keys(a),
            toLoadLanguages: Object.keys(l),
            toLoadNamespaces: Object.keys(o)
        }
    }
    loaded(e, t, s) {
        let n = e.split("|"),
            r = n[0],
            a = n[1];
        t && this.emit("failedLoading", r, a, t), s && this.store.addResourceBundle(r, a, s), this.state[e] = t ? -1 : 2;
        let l = {};
        this.queue.forEach(o => {
            de(o.loaded, [r], a), Re(o, e), t && o.errors.push(t), o.pendingCount === 0 && !o.done && (Object.keys(o.loaded).forEach(f => {
                l[f] || (l[f] = {});
                let g = o.loaded[f];
                g.length && g.forEach(h => {
                    l[f][h] === void 0 && (l[f][h] = !0)
                })
            }), o.done = !0, o.errors.length ? o.callback(o.errors) : o.callback())
        }), this.emit("loaded", l), this.queue = this.queue.filter(o => !o.done)
    }
    read(e, t, s) {
        let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0,
            r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout,
            a = arguments.length > 5 ? arguments[5] : void 0;
        if (!e.length) return a(null, {});
        if (this.readingCalls >= this.maxParallelReads) {
            this.waitingReads.push({
                lng: e,
                ns: t,
                fcName: s,
                tried: n,
                wait: r,
                callback: a
            });
            return
        }
        this.readingCalls++;
        let l = (f, g) => {
                if (this.readingCalls--, this.waitingReads.length > 0) {
                    let h = this.waitingReads.shift();
                    this.read(h.lng, h.ns, h.fcName, h.tried, h.wait, h.callback)
                }
                if (f && g && n < this.maxRetries) {
                    setTimeout(() => {
                        this.read.call(this, e, t, s, n + 1, r * 2, a)
                    }, r);
                    return
                }
                a(f, g)
            },
            o = this.backend[s].bind(this.backend);
        if (o.length === 2) {
            try {
                let f = o(e, t);
                f && typeof f.then == "function" ? f.then(g => l(null, g)).catch(l) : l(null, f)
            } catch (f) {
                l(f)
            }
            return
        }
        return o(e, t, l)
    }
    prepareLoading(e, t) {
        let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
            n = arguments.length > 3 ? arguments[3] : void 0;
        if (!this.backend) return this.logger.warn("No backend was added via i18next.use. Will not load resources."), n && n();
        typeof e == "string" && (e = this.languageUtils.toResolveHierarchy(e)), typeof t == "string" && (t = [t]);
        let r = this.queueLoad(e, t, s, n);
        if (!r.toLoad.length) return r.pending.length || n(), null;
        r.toLoad.forEach(a => {
            this.loadOne(a)
        })
    }
    load(e, t, s) {
        this.prepareLoading(e, t, {}, s)
    }
    reload(e, t, s) {
        this.prepareLoading(e, t, {
            reload: !0
        }, s)
    }
    loadOne(e) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "",
            s = e.split("|"),
            n = s[0],
            r = s[1];
        this.read(n, r, "read", void 0, void 0, (a, l) => {
            a && this.logger.warn(`${t}loading namespace ${r} for language ${n} failed`, a), !a && l && this.logger.log(`${t}loaded namespace ${r} for language ${n}`, l), this.loaded(e, a, l)
        })
    }
    saveMissing(e, t, s, n, r) {
        let a = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {},
            l = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : () => {};
        if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(t)) {
            this.logger.warn(`did not save key "${s}" as the namespace "${t}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
            return
        }
        if (!(s == null || s === "")) {
            if (this.backend && this.backend.create) {
                let o = { ...a,
                        isUpdate: r
                    },
                    f = this.backend.create.bind(this.backend);
                if (f.length < 6) try {
                    let g;
                    f.length === 5 ? g = f(e, t, s, n, o) : g = f(e, t, s, n), g && typeof g.then == "function" ? g.then(h => l(null, h)).catch(l) : l(null, g)
                } catch (g) {
                    l(g)
                } else f(e, t, s, n, l, o)
            }!e || !e[0] || this.store.addResource(e[0], t, s, n)
        }
    }
};

function ae() {
    return {
        debug: !1,
        initImmediate: !0,
        ns: ["translation"],
        defaultNS: ["translation"],
        fallbackLng: ["dev"],
        fallbackNS: !1,
        supportedLngs: !1,
        nonExplicitSupportedLngs: !1,
        load: "all",
        preload: !1,
        simplifyPluralSuffix: !0,
        keySeparator: ".",
        nsSeparator: ":",
        pluralSeparator: "_",
        contextSeparator: "_",
        partialBundledLanguages: !1,
        saveMissing: !1,
        updateMissing: !1,
        saveMissingTo: "fallback",
        saveMissingPlurals: !0,
        missingKeyHandler: !1,
        missingInterpolationHandler: !1,
        postProcess: !1,
        postProcessPassResolved: !1,
        returnNull: !1,
        returnEmptyString: !0,
        returnObjects: !1,
        joinArrays: !1,
        returnedObjectHandler: !1,
        parseMissingKeyHandler: !1,
        appendNamespaceToMissingKey: !1,
        appendNamespaceToCIMode: !1,
        overloadTranslationOptionHandler: function(e) {
            let t = {};
            if (typeof e[1] == "object" && (t = e[1]), typeof e[1] == "string" && (t.defaultValue = e[1]), typeof e[2] == "string" && (t.tDescription = e[2]), typeof e[2] == "object" || typeof e[3] == "object") {
                let s = e[3] || e[2];
                Object.keys(s).forEach(n => {
                    t[n] = s[n]
                })
            }
            return t
        },
        interpolation: {
            escapeValue: !0,
            format: i => i,
            prefix: "{{",
            suffix: "}}",
            formatSeparator: ",",
            unescapePrefix: "-",
            nestingPrefix: "$t(",
            nestingSuffix: ")",
            nestingOptionsSeparator: ",",
            maxReplaces: 1e3,
            skipOnVariables: !0
        }
    }
}

function oe(i) {
    return typeof i.ns == "string" && (i.ns = [i.ns]), typeof i.fallbackLng == "string" && (i.fallbackLng = [i.fallbackLng]), typeof i.fallbackNS == "string" && (i.fallbackNS = [i.fallbackNS]), i.supportedLngs && i.supportedLngs.indexOf("cimode") < 0 && (i.supportedLngs = i.supportedLngs.concat(["cimode"])), i
}

function U() {}

function Pe(i) {
    Object.getOwnPropertyNames(Object.getPrototypeOf(i)).forEach(t => {
        typeof i[t] == "function" && (i[t] = i[t].bind(i))
    })
}
var R = class extends j {
        constructor() {
            let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
                t = arguments.length > 1 ? arguments[1] : void 0;
            if (super(), this.options = oe(e), this.services = {}, this.logger = N, this.modules = {
                    external: []
                }, Pe(this), t && !this.isInitialized && !e.isClone) {
                if (!this.options.initImmediate) return this.init(e, t), this;
                setTimeout(() => {
                    this.init(e, t)
                }, 0)
            }
        }
        init() {
            var e = this;
            let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
                s = arguments.length > 1 ? arguments[1] : void 0;
            typeof t == "function" && (s = t, t = {}), !t.defaultNS && t.defaultNS !== !1 && t.ns && (typeof t.ns == "string" ? t.defaultNS = t.ns : t.ns.indexOf("translation") < 0 && (t.defaultNS = t.ns[0]));
            let n = ae();
            this.options = { ...n,
                ...this.options,
                ...oe(t)
            }, this.options.compatibilityAPI !== "v1" && (this.options.interpolation = { ...n.interpolation,
                ...this.options.interpolation
            }), t.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = t.keySeparator), t.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = t.nsSeparator);

            function r(g) {
                return g ? typeof g == "function" ? new g : g : null
            }
            if (!this.options.isClone) {
                this.modules.logger ? N.init(r(this.modules.logger), this.options) : N.init(null, this.options);
                let g;
                this.modules.formatter ? g = this.modules.formatter : typeof Intl < "u" && (g = Q);
                let h = new z(this.options);
                this.store = new B(this.options.resources, this.options);
                let u = this.services;
                u.logger = N, u.resourceStore = this.store, u.languageUtils = h, u.pluralResolver = new Y(h, {
                    prepend: this.options.pluralSeparator,
                    compatibilityJSON: this.options.compatibilityJSON,
                    simplifyPluralSuffix: this.options.simplifyPluralSuffix
                }), g && (!this.options.interpolation.format || this.options.interpolation.format === n.interpolation.format) && (u.formatter = r(g), u.formatter.init(u, this.options), this.options.interpolation.format = u.formatter.format.bind(u.formatter)), u.interpolator = new G(this.options), u.utils = {
                    hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
                }, u.backendConnector = new Z(r(this.modules.backend), u.resourceStore, u, this.options), u.backendConnector.on("*", function(d) {
                    for (var c = arguments.length, p = new Array(c > 1 ? c - 1 : 0), m = 1; m < c; m++) p[m - 1] = arguments[m];
                    e.emit(d, ...p)
                }), this.modules.languageDetector && (u.languageDetector = r(this.modules.languageDetector), u.languageDetector.init && u.languageDetector.init(u, this.options.detection, this.options)), this.modules.i18nFormat && (u.i18nFormat = r(this.modules.i18nFormat), u.i18nFormat.init && u.i18nFormat.init(this)), this.translator = new F(this.services, this.options), this.translator.on("*", function(d) {
                    for (var c = arguments.length, p = new Array(c > 1 ? c - 1 : 0), m = 1; m < c; m++) p[m - 1] = arguments[m];
                    e.emit(d, ...p)
                }), this.modules.external.forEach(d => {
                    d.init && d.init(this)
                })
            }
            if (this.format = this.options.interpolation.format, s || (s = U), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
                let g = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
                g.length > 0 && g[0] !== "dev" && (this.options.lng = g[0])
            }!this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach(g => {
                this[g] = function() {
                    return e.store[g](...arguments)
                }
            }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach(g => {
                this[g] = function() {
                    return e.store[g](...arguments), e
                }
            });
            let o = A(),
                f = () => {
                    let g = (h, u) => {
                        this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), o.resolve(u), s(h, u)
                    };
                    if (this.languages && this.options.compatibilityAPI !== "v1" && !this.isInitialized) return g(null, this.t.bind(this));
                    this.changeLanguage(this.options.lng, g)
                };
            return this.options.resources || !this.options.initImmediate ? f() : setTimeout(f, 0), o
        }
        loadResources(e) {
            let s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : U,
                n = typeof e == "string" ? e : this.language;
            if (typeof e == "function" && (s = e), !this.options.resources || this.options.partialBundledLanguages) {
                if (n && n.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return s();
                let r = [],
                    a = l => {
                        if (!l || l === "cimode") return;
                        this.services.languageUtils.toResolveHierarchy(l).forEach(f => {
                            f !== "cimode" && r.indexOf(f) < 0 && r.push(f)
                        })
                    };
                n ? a(n) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(o => a(o)), this.options.preload && this.options.preload.forEach(l => a(l)), this.services.backendConnector.load(r, this.options.ns, l => {
                    !l && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), s(l)
                })
            } else s(null)
        }
        reloadResources(e, t, s) {
            let n = A();
            return e || (e = this.languages), t || (t = this.options.ns), s || (s = U), this.services.backendConnector.reload(e, t, r => {
                n.resolve(), s(r)
            }), n
        }
        use(e) {
            if (!e) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
            if (!e.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
            return e.type === "backend" && (this.modules.backend = e), (e.type === "logger" || e.log && e.warn && e.error) && (this.modules.logger = e), e.type === "languageDetector" && (this.modules.languageDetector = e), e.type === "i18nFormat" && (this.modules.i18nFormat = e), e.type === "postProcessor" && ue.addPostProcessor(e), e.type === "formatter" && (this.modules.formatter = e), e.type === "3rdParty" && this.modules.external.push(e), this
        }
        setResolvedLanguage(e) {
            if (!(!e || !this.languages) && !(["cimode", "dev"].indexOf(e) > -1))
                for (let t = 0; t < this.languages.length; t++) {
                    let s = this.languages[t];
                    if (!(["cimode", "dev"].indexOf(s) > -1) && this.store.hasLanguageSomeTranslations(s)) {
                        this.resolvedLanguage = s;
                        break
                    }
                }
        }
        changeLanguage(e, t) {
            var s = this;
            this.isLanguageChangingTo = e;
            let n = A();
            this.emit("languageChanging", e);
            let r = o => {
                    this.language = o, this.languages = this.services.languageUtils.toResolveHierarchy(o), this.resolvedLanguage = void 0, this.setResolvedLanguage(o)
                },
                a = (o, f) => {
                    f ? (r(f), this.translator.changeLanguage(f), this.isLanguageChangingTo = void 0, this.emit("languageChanged", f), this.logger.log("languageChanged", f)) : this.isLanguageChangingTo = void 0, n.resolve(function() {
                        return s.t(...arguments)
                    }), t && t(o, function() {
                        return s.t(...arguments)
                    })
                },
                l = o => {
                    !e && !o && this.services.languageDetector && (o = []);
                    let f = typeof o == "string" ? o : this.services.languageUtils.getBestMatchFromCodes(o);
                    f && (this.language || r(f), this.translator.language || this.translator.changeLanguage(f), this.services.languageDetector && this.services.languageDetector.cacheUserLanguage && this.services.languageDetector.cacheUserLanguage(f)), this.loadResources(f, g => {
                        a(g, f)
                    })
                };
            return !e && this.services.languageDetector && !this.services.languageDetector.async ? l(this.services.languageDetector.detect()) : !e && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(l) : this.services.languageDetector.detect(l) : l(e), n
        }
        getFixedT(e, t, s) {
            var n = this;
            let r = function(a, l) {
                let o;
                if (typeof l != "object") {
                    for (var f = arguments.length, g = new Array(f > 2 ? f - 2 : 0), h = 2; h < f; h++) g[h - 2] = arguments[h];
                    o = n.options.overloadTranslationOptionHandler([a, l].concat(g))
                } else o = { ...l
                };
                o.lng = o.lng || r.lng, o.lngs = o.lngs || r.lngs, o.ns = o.ns || r.ns, o.keyPrefix = o.keyPrefix || s || r.keyPrefix;
                let u = n.options.keySeparator || ".",
                    d;
                return o.keyPrefix && Array.isArray(a) ? d = a.map(c => `${o.keyPrefix}${u}${c}`) : d = o.keyPrefix ? `${o.keyPrefix}${u}${a}` : a, n.t(d, o)
            };
            return typeof e == "string" ? r.lng = e : r.lngs = e, r.ns = t, r.keyPrefix = s, r
        }
        t() {
            return this.translator && this.translator.translate(...arguments)
        }
        exists() {
            return this.translator && this.translator.exists(...arguments)
        }
        setDefaultNamespace(e) {
            this.options.defaultNS = e
        }
        hasLoadedNamespace(e) {
            let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            if (!this.isInitialized) return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
            if (!this.languages || !this.languages.length) return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
            let s = t.lng || this.resolvedLanguage || this.languages[0],
                n = this.options ? this.options.fallbackLng : !1,
                r = this.languages[this.languages.length - 1];
            if (s.toLowerCase() === "cimode") return !0;
            let a = (l, o) => {
                let f = this.services.backendConnector.state[`${l}|${o}`];
                return f === -1 || f === 2
            };
            if (t.precheck) {
                let l = t.precheck(this, a);
                if (l !== void 0) return l
            }
            return !!(this.hasResourceBundle(s, e) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || a(s, e) && (!n || a(r, e)))
        }
        loadNamespaces(e, t) {
            let s = A();
            return this.options.ns ? (typeof e == "string" && (e = [e]), e.forEach(n => {
                this.options.ns.indexOf(n) < 0 && this.options.ns.push(n)
            }), this.loadResources(n => {
                s.resolve(), t && t(n)
            }), s) : (t && t(), Promise.resolve())
        }
        loadLanguages(e, t) {
            let s = A();
            typeof e == "string" && (e = [e]);
            let n = this.options.preload || [],
                r = e.filter(a => n.indexOf(a) < 0);
            return r.length ? (this.options.preload = n.concat(r), this.loadResources(a => {
                s.resolve(), t && t(a)
            }), s) : (t && t(), Promise.resolve())
        }
        dir(e) {
            if (e || (e = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language)), !e) return "rtl";
            let t = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"],
                s = this.services && this.services.languageUtils || new z(ae());
            return t.indexOf(s.getLanguagePartFromCode(e)) > -1 || e.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr"
        }
        static createInstance() {
            let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
                t = arguments.length > 1 ? arguments[1] : void 0;
            return new R(e, t)
        }
        cloneInstance() {
            let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
                t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : U,
                s = e.forkResourceStore;
            s && delete e.forkResourceStore;
            let n = { ...this.options,
                    ...e,
                    isClone: !0
                },
                r = new R(n);
            return (e.debug !== void 0 || e.prefix !== void 0) && (r.logger = r.logger.clone(e)), ["store", "services", "language"].forEach(l => {
                r[l] = this[l]
            }), r.services = { ...this.services
            }, r.services.utils = {
                hasLoadedNamespace: r.hasLoadedNamespace.bind(r)
            }, s && (r.store = new B(this.store.data, n), r.services.resourceStore = r.store), r.translator = new F(r.services, n), r.translator.on("*", function(l) {
                for (var o = arguments.length, f = new Array(o > 1 ? o - 1 : 0), g = 1; g < o; g++) f[g - 1] = arguments[g];
                r.emit(l, ...f)
            }), r.init(n, t), r.translator.options = n, r.translator.backendConnector.services.utils = {
                hasLoadedNamespace: r.hasLoadedNamespace.bind(r)
            }, r
        }
        toJSON() {
            return {
                options: this.options,
                store: this.store,
                language: this.language,
                languages: this.languages,
                resolvedLanguage: this.resolvedLanguage
            }
        }
    },
    S = R.createInstance();
S.createInstance = R.createInstance;
var $e = S.createInstance,
    ke = S.dir,
    je = S.init,
    Fe = S.loadResources,
    Ee = S.reloadResources,
    Ie = S.use,
    De = S.changeLanguage,
    Ae = S.getFixedT,
    Ve = S.t,
    Te = S.exists,
    Ke = S.setDefaultNamespace,
    Ue = S.hasLoadedNamespace,
    Me = S.loadNamespaces,
    He = S.loadLanguages;
export {
    S as a
};