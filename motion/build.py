"""Genera las composiciones de HyperFrames de los casos de estudio, en español e inglés.

Uso:   python motion/build.py          escribe motion/<caso>/<es|en>/index.html
Luego: por cada carpeta, `npx hyperframes check` y `npx hyperframes render`.
Paleta y tipografía: las de DropAudio CCS (ver docs/plan-casos-de-estudio.md).
Los textos de cada video viven en T; no agregar cifras que no estén en caseStudies.ts.
"""
from pathlib import Path

HEAD = """<!doctype html>
<html lang="{lang}"><head><meta charset="UTF-8" />
<meta name="viewport" content="width=1280, height=800" />
<title>{title}</title>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>
  body {{ margin:0; background:#0C0B09; color:#FAF9F7; font-family:'Segoe UI',system-ui,sans-serif; }}
  #root {{ position:relative; width:100%; height:100%; overflow:hidden;
    background:radial-gradient(circle at 85% -10%, #3a2b12 0%, #0C0B09 55%); }}
  .grid {{ position:absolute; inset:0; opacity:.5;
    background-image:linear-gradient(rgba(205,168,96,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(205,168,96,.07) 1px,transparent 1px);
    background-size:64px 64px; }}
  .clip {{ position:absolute; inset:0; }}
  .stage {{ position:absolute; inset:0; padding:56px 72px; display:flex; flex-direction:column; gap:26px; }}
  h2 {{ margin:0; font-size:46px; font-weight:700; letter-spacing:-0.02em; }}
  .sub {{ font-size:25px; color:#BDB4A4; margin-top:-8px; }}
  .gold {{ color:#CDA860; }} .wine {{ color:#D36A76; }} .muted {{ color:#BDB4A4; }}
  .chip {{ border:1px solid rgba(205,168,96,.4); background:rgba(22,19,13,.92); border-radius:12px;
    padding:14px 22px; font-size:26px; font-weight:600; }}
  .mono {{ font-family:monospace; }}
  {css}
</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-width="1280" data-height="800" data-duration="8">
<div class="grid"></div>
<section id="scene" class="clip" data-start="0" data-duration="8"><div class="stage">
{body}
</div></section></div>
<script>
const tl = gsap.timeline({{ paused: true }});
tl.fromTo(".grid",{{backgroundPosition:"0px 0px"}},{{backgroundPosition:"-128px -128px",duration:8,ease:"none"}},0);
{js}
window.__timelines["main"] = tl;
</script></body></html>
"""

T = {
    "dropaudio": {
        "es": dict(h="¿Cuál audífono es para ti?", steps=["1 · Tu gusto", "2 · Tu presupuesto", "3 · Tu uso"],
                   rec="Tu recomendación", rate="Tasas BCV y USDT en vivo", pay=["USDT", "Zinli", "Pago Móvil"], tag="Tienda en producción"),
        "en": dict(h="Which headphones are right for you?", steps=["1 · Your taste", "2 · Your budget", "3 · Your use"],
                   rec="Your recommendation", rate="Live BCV and USDT rates", pay=["USDT", "Zinli", "Pago Móvil"], tag="Store in production"),
    },
    "reel-studio": {
        "es": dict(h="De material crudo a borrador en CapCut", sub="Cada toma se transcribe, se describe y se puntúa en tu propia computadora.",
                   script="Guion escrito · 1080×1920", skip="descartada", keep="usable"),
        "en": dict(h="From raw footage to a CapCut draft", sub="Every take is transcribed, described and scored on your own computer.",
                   script="Script written · 1080×1920", skip="skipped", keep="usable"),
    },
    "monitoring": {
        "es": dict(h="Monitoreo industrial, sin nadie en sitio", sub="Dos equipos en red, un mismo programa, cada frontera con su timeout.",
                   a="Equipo A", b="Equipo B", cam="Cámaras", tos=["Rol automático", "Imágenes por bloques", "Timeout en cada red"]),
        "en": dict(h="Industrial monitoring, nobody on site", sub="Two networked machines, one program, every boundary with its own timeout.",
                   a="Machine A", b="Machine B", cam="Cameras", tos=["Automatic role", "Chunked images", "Timeout on every link"]),
    },
    "stabilization": {
        "es": dict(h="Del temblor a una trayectoria suave", raw="Cámara en mano", smooth="Trayectoria suavizada", how="flujo óptico + QP"),
        "en": dict(h="From shake to a smooth path", raw="Handheld camera", smooth="Smoothed path", how="optical flow + QP"),
    },
}


def dropaudio(t):
    css = """
  .steps{display:flex;gap:18px}.step{flex:1;opacity:.3;text-align:center}
  .card{padding:28px 34px;border-radius:18px;border:1px solid rgba(205,168,96,.5);
    background:linear-gradient(145deg,#1f1a11,#0f0d09);display:flex;flex-direction:column;gap:16px;box-shadow:0 0 60px rgba(205,168,96,.12)}
  .bar{height:12px;border-radius:6px;background:rgba(205,168,96,.15);overflow:hidden}
  .bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#E2C47F,#967337)}
  .pay{display:flex;gap:16px}.pay .chip{opacity:0}.tagc{align-self:flex-start;font-size:22px;padding:8px 16px}
"""
    body = f"""<div class="chip tagc gold" id="tag">● {t['tag']}</div>
<h2 id="h">{t['h']}</h2>
<div class="steps"><div class="chip step" id="s1">{t['steps'][0]}</div><div class="chip step" id="s2">{t['steps'][1]}</div><div class="chip step" id="s3">{t['steps'][2]}</div></div>
<div class="card" id="card"><div class="gold" style="font-size:30px;font-weight:700">{t['rec']}</div>
<div class="bar"><i id="b1"></i></div><div class="bar"><i id="b2"></i></div><div class="bar"><i id="b3"></i></div></div>
<div class="muted" style="font-size:24px" id="rate">{t['rate']}</div>
<div class="pay"><div class="chip" id="p1">{t['pay'][0]}</div><div class="chip" id="p2">{t['pay'][1]}</div><div class="chip" id="p3">{t['pay'][2]}</div></div>"""
    js = """
tl.from("#tag",{opacity:0,x:-30,duration:.5},.1);
tl.from("#h",{y:30,opacity:0,duration:.6,ease:"power3.out"},.3);
["s1","s2","s3"].forEach((id,i)=>tl.to("#"+id,{opacity:1,borderColor:"#CDA860",duration:.4},1+i*.8));
tl.from("#card",{y:40,opacity:0,duration:.6,ease:"power3.out"},3.3);
[["b1",.92],["b2",.74],["b3",.85]].forEach(([id,w],i)=>tl.to("#"+id,{width:(w*100)+"%",duration:.9,ease:"power2.out"},3.8+i*.2));
tl.from("#rate",{opacity:0,duration:.4},5.2);
["p1","p2","p3"].forEach((id,i)=>tl.fromTo("#"+id,{opacity:0,y:20},{opacity:1,y:0,duration:.45,ease:"back.out(1.6)"},5.5+i*.3));
"""
    return css, body, js


def reel(t):
    css = """
  .row{display:flex;gap:10px}
  .take{flex:1;height:100px;border-radius:10px;border:1px solid rgba(205,168,96,.3);background:#1a160e;
    display:flex;flex-direction:column;justify-content:flex-end;padding:10px;font-size:20px;gap:2px}
  .take small{font-size:16px;color:#8E8576}
  .take.skip{opacity:.3}
  .big{display:flex;align-items:baseline;gap:24px;margin-top:8px}
  .big s{font-size:56px;color:#8E8576;text-decoration-color:#D36A76;text-decoration-thickness:4px}
  .big b{font-size:124px;line-height:1;letter-spacing:-0.03em;color:#CDA860}
"""
    def tk(score, skip):
        return f'<div class="take{" skip" if skip else ""}"><span>{score}</span><small>{t["skip"] if skip else t["keep"]}</small></div>'
    body = f"""<h2 id="h">{t['h']}</h2><div class="sub">{t['sub']}</div>
<div class="row" id="takes">{tk('9.1',0)}{tk('2.0',1)}{tk('8.4',0)}{tk('3.2',1)}{tk('9.4',0)}{tk('7.8',0)}</div>
<div class="chip gold" id="script" style="align-self:flex-start">{t['script']}</div>
<div class="big"><s id="from">2 h</s><b id="to">15 min</b></div>"""
    js = """
tl.from("#h",{y:30,opacity:0,duration:.6,ease:"power3.out"},.2);
tl.from(".sub",{opacity:0,duration:.5},.6);
tl.from(".take",{opacity:0,y:24,stagger:.15,duration:.4},1.2);
tl.to(".take:not(.skip)",{borderColor:"#CDA860",duration:.4,stagger:.12},2.6);
tl.from("#script",{opacity:0,x:-30,duration:.5},4.1);
tl.from("#from",{opacity:0,duration:.4},5);
tl.from("#to",{opacity:0,scale:.8,duration:.6,ease:"back.out(1.8)"},5.6);
"""
    return css, body, js


def monitoring(t):
    css = """
  svg{width:100%;height:330px}
  .node rect{fill:#16130D;stroke:#CDA860;stroke-width:2;rx:14}
  .node text{fill:#FAF9F7;font-size:26px;font-weight:600;text-anchor:middle}
  .lbl{fill:#BDB4A4;font-size:20px;text-anchor:middle}
  .tos{display:flex;gap:14px}.tos .chip{font-size:22px;opacity:0}
"""
    body = f"""<h2 id="h">{t['h']}</h2><div class="sub">{t['sub']}</div>
<svg viewBox="0 0 1136 330">
 <g class="node" id="nA"><rect x="40" y="80" width="260" height="130"/><text x="170" y="155">{t['a']}</text></g>
 <g class="node" id="nB"><rect x="470" y="80" width="260" height="130"/><text x="600" y="155">{t['b']}</text></g>
 <g class="node" id="nC"><rect x="880" y="20" width="220" height="80"/><text x="990" y="70">{t['cam']} 1</text></g>
 <g class="node" id="nD"><rect x="880" y="130" width="220" height="80"/><text x="990" y="180">{t['cam']} 2</text></g>
 <g class="node" id="nE"><rect x="880" y="240" width="220" height="80" style="opacity:.35"/><text x="990" y="290" style="opacity:.35">{t['cam']} 3</text></g>
 <path id="l1" d="M300 145 H470" stroke="#CDA860" stroke-width="4" fill="none"/>
 <path id="l2" d="M730 130 C800 130 800 60 880 60" stroke="#CDA860" stroke-width="4" fill="none"/>
 <path id="l3" d="M730 160 C800 160 800 170 880 170" stroke="#CDA860" stroke-width="4" fill="none"/>
 <path id="l4" d="M730 190 C800 190 800 280 880 280" stroke="#D36A76" stroke-width="4" stroke-dasharray="10 10" fill="none"/>
 <circle id="pk" r="9" fill="#E2C47F" cx="300" cy="145"/>
</svg>
<div class="tos"><div class="chip" id="t1">{t['tos'][0]}</div><div class="chip" id="t2">{t['tos'][1]}</div><div class="chip" id="t3">{t['tos'][2]}</div></div>"""
    js = """
tl.from("#h",{y:30,opacity:0,duration:.6,ease:"power3.out"},.2);
tl.from(".sub",{opacity:0,duration:.5},.6);
["nA","nB"].forEach((id,i)=>tl.from("#"+id,{opacity:0,y:20,duration:.5},1+i*.2));
tl.from("#l1",{opacity:0,duration:.4},1.6);
["nC","nD","nE"].forEach((id,i)=>tl.from("#"+id,{opacity:0,x:30,duration:.4},2+i*.15));
["l2","l3","l4"].forEach((id,i)=>tl.from("#"+id,{opacity:0,duration:.4},2.3+i*.15));
tl.fromTo("#pk",{attr:{cx:300,cy:145}},{attr:{cx:470,cy:145},duration:.8,ease:"power1.inOut",repeat:2,repeatDelay:.2},3);
tl.to("#nE",{opacity:.6,duration:.3},5);
["t1","t2","t3"].forEach((id,i)=>tl.fromTo("#"+id,{opacity:0,y:20},{opacity:1,y:0,duration:.45,ease:"back.out(1.6)"},5.4+i*.3));
"""
    return css, body, js


def stabilization(t):
    css = """
  svg{width:100%;height:380px}
  .legend{display:flex;gap:28px;font-size:24px}
"""
    body = f"""<h2 id="h">{t['h']}</h2>
<svg viewBox="0 0 1136 380"><path id="raw" d="M0 190 L40 140 L80 240 L120 130 L160 250 L200 150 L240 230 L280 120 L320 240 L360 140 L400 235 L440 130 L480 245 L520 155 L560 225 L600 125 L640 245 L680 140 L720 235 L760 150 L800 230 L840 130 L880 240 L920 155 L960 225 L1000 140 L1040 230 L1136 190" fill="none" stroke="#D36A76" stroke-width="4" stroke-linejoin="round"/>
<path id="smooth" d="M0 190 C250 190 350 180 568 190 S900 200 1136 190" fill="none" stroke="#CDA860" stroke-width="9" stroke-linecap="round"/></svg>
<div class="legend"><span class="wine">{t['raw']}</span><span class="gold">{t['smooth']}</span><span class="muted mono">{t['how']}</span></div>"""
    js = """
const L=(id)=>document.getElementById(id).getTotalLength();
gsap.set("#raw",{strokeDasharray:L("raw"),strokeDashoffset:L("raw")});
gsap.set("#smooth",{strokeDasharray:L("smooth"),strokeDashoffset:L("smooth")});
tl.from("#h",{y:30,opacity:0,duration:.6,ease:"power3.out"},.2);
tl.to("#raw",{strokeDashoffset:0,duration:2.2,ease:"none"},1);
tl.to("#raw",{opacity:.25,duration:.6},3.6);
tl.to("#smooth",{strokeDashoffset:0,duration:2.2,ease:"power2.inOut"},3.8);
tl.from(".legend span",{opacity:0,y:16,stagger:.3,duration:.4},2);
"""
    return css, body, js


# --- Videos de las tarjetas de proyecto (explican cada repo en 8 s) ---

T.update({
    "voice": {
        "es": dict(h="Una conversación, en tiempo real", steps=["Tu voz", "Transcripción", "Gemini 2.5 Flash", "Voz sintetizada"], lat="audio crítico en Rust", ws="WebSocket"),
        "en": dict(h="A conversation, in real time", steps=["Your voice", "Transcription", "Gemini 2.5 Flash", "Synthesized voice"], lat="critical audio in Rust", ws="WebSocket"),
    },
    "rif": {
        "es": dict(h="Del PDF del RIF a JSON", doc="RIF · PDF o imagen", e1="Texto nativo", e2="PaddleOCR", e3="Tesseract de respaldo",
                   k=["rif", "razon_social", "domicilio_fiscal", "estado"], ok="respuesta siempre válida"),
        "en": dict(h="From a RIF PDF to JSON", doc="RIF · PDF or image", e1="Native text", e2="PaddleOCR", e3="Tesseract fallback",
                   k=["rif", "razon_social", "domicilio_fiscal", "estado"], ok="always-valid response"),
    },
    "bolsa": {
        "es": dict(h="Datos de la Bolsa de Caracas, como API", steps=["Sitio de la Bolsa", "Selenium", "FastAPI", "JSON público"],
                   eps=["GET /acciones", "GET /acciones/{simbolo}"]),
        "en": dict(h="Caracas Stock Exchange data, as an API", steps=["Exchange website", "Selenium", "FastAPI", "Public JSON"],
                   eps=["GET /acciones", "GET /acciones/{simbolo}"]),
    },
    "mesh": {
        "es": dict(h="Una malla que aprende a quedarse quieta", c=["Malla + flujo óptico", "Pesos predichos por red neuronal", "MSE · PSNR · SSIM"]),
        "en": dict(h="A mesh that learns to stay still", c=["Mesh + optical flow", "Weights predicted by a neural net", "MSE · PSNR · SSIM"]),
    },
    "flownet": {
        "es": dict(h="El movimiento lo estima una red", c=["PWC-Net destilado", "Trayectoria afín", "Suavizado QP", "CUDA"]),
        "en": dict(h="A network estimates the motion", c=["Distilled PWC-Net", "Affine path", "QP smoothing", "CUDA"]),
    },
})

PIPE_CSS = """
  .pipe{display:flex;align-items:center;gap:12px}
  .pipe .chip{opacity:0;font-size:24px}
  .pipe i{flex:0 0 28px;height:2px;background:#CDA860;opacity:0}
"""


def pipe(steps):
    out = []
    for i, s in enumerate(steps):
        if i:
            out.append(f'<i class="pa" id="a{i}"></i>')
        out.append(f'<div class="chip" id="c{i}">{s}</div>')
    return '<div class="pipe">' + "".join(out) + "</div>"


PIPE_JS = """
document.querySelectorAll(".pipe .chip").forEach((el,i)=>{
  tl.fromTo(el,{opacity:0,y:16},{opacity:1,y:0,duration:.4,ease:"back.out(1.6)"},START+i*.55);
  const a=document.getElementById("a"+(i+1)); if(a) tl.fromTo(a,{opacity:0,scaleX:0},{opacity:1,scaleX:1,transformOrigin:"left",duration:.3},START+i*.55+.35);
});
"""


def voice(t):
    bars = "".join(f'<b style="height:{20 + int(60 * abs(__import__("math").sin(i * 0.7)))}px"></b>' for i in range(48))
    css = PIPE_CSS + """
  .wave{display:flex;align-items:center;gap:6px;height:170px}
  .wave b{flex:1;background:linear-gradient(#E2C47F,#967337);border-radius:4px;transform-origin:center}
  .meta{display:flex;gap:16px}.meta .chip{font-size:22px}
"""
    body = f"""<h2 id="h">{t['h']}</h2><div class="wave" id="wave">{bars}</div>{pipe(t['steps'])}
<div class="meta"><div class="chip gold" id="m1">{t['lat']}</div><div class="chip mono" id="m2">{t['ws']}</div></div>"""
    js = "const START=2.2;" + PIPE_JS + """
tl.from("#h",{y:30,opacity:0,duration:.6,ease:"power3.out"},.2);
tl.fromTo(".wave b",{scaleY:.15},{scaleY:1,duration:.35,ease:"sine.inOut",stagger:{each:.03,yoyo:true,repeat:7}},.6);
tl.from("#m1",{opacity:0,x:-20,duration:.4},5.2);tl.from("#m2",{opacity:0,x:-20,duration:.4},5.5);
"""
    return css, body, js


def rif(t):
    css = """
  .wrap{display:flex;gap:40px;align-items:stretch}
  .doc{position:relative;width:330px;height:420px;border-radius:14px;background:#ECE6DA;overflow:hidden;flex:none}
  .doc p{margin:0;height:14px;border-radius:7px;background:#C9BFAE;margin:22px 26px 0}
  .doc .scan{position:absolute;left:0;right:0;height:4px;background:#CDA860;box-shadow:0 0 24px #CDA860;top:0}
  .doc .cap{position:absolute;bottom:16px;left:26px;color:#3a3226;font-size:20px;font-weight:600}
  .right{flex:1;display:flex;flex-direction:column;gap:18px}
  .eng{display:flex;gap:12px}.eng .chip{font-size:21px;opacity:0}
  .json{font-family:monospace;font-size:24px;line-height:1.7;background:#110F0B;border:1px solid rgba(205,168,96,.35);border-radius:14px;padding:20px 26px}
  .json div{opacity:0}.k{color:#CDA860}.v{color:#BDB4A4}
"""
    lines = "".join(f'<div class="jl">&nbsp;&nbsp;<span class="k">"{k}"</span>: <span class="v">"…"</span>{"," if i < 3 else ""}</div>' for i, k in enumerate(t["k"]))
    body = f"""<h2 id="h">{t['h']}</h2><div class="wrap">
<div class="doc" id="doc"><p style="width:60%"></p><p></p><p style="width:80%"></p><p></p><p style="width:70%"></p><p></p><p style="width:50%"></p><p></p><p style="width:75%"></p><div class="scan" id="scan"></div><div class="cap">{t['doc']}</div></div>
<div class="right"><div class="eng"><div class="chip" id="e1">{t['e1']}</div><div class="chip gold" id="e2">{t['e2']}</div><div class="chip" id="e3">{t['e3']}</div></div>
<div class="json"><div class="jl">{{</div>{lines}<div class="jl">}}</div></div><div class="muted" id="ok" style="font-size:22px">✓ {t['ok']}</div></div></div>"""
    js = """
tl.from("#h",{y:30,opacity:0,duration:.6,ease:"power3.out"},.2);
tl.from("#doc",{opacity:0,x:-40,duration:.6},.6);
tl.fromTo("#scan",{y:0},{y:416,duration:1.6,ease:"none",repeat:1,yoyo:true},1.1);
["e1","e2","e3"].forEach((id,i)=>tl.fromTo("#"+id,{opacity:0,y:14},{opacity:1,y:0,duration:.4},1.4+i*.4));
tl.to(".jl",{opacity:1,duration:.3,stagger:.25},3.2);
tl.from("#ok",{opacity:0,duration:.4},5.4);
"""
    return css, body, js


def bolsa(t):
    css = PIPE_CSS + """
  svg{width:100%;height:230px}
  .eps{display:flex;flex-direction:column;gap:10px;font-family:monospace;font-size:24px}
  .eps div{opacity:0}.eps b{color:#CDA860;font-weight:700;margin-right:12px}
"""
    import math
    pts = " ".join(f"{x},{120 - 60 * math.sin(x / 90) - 25 * math.sin(x / 31) + x * -0.03:.1f}" for x in range(0, 1137, 8))
    eps = "".join(f'<div class="ep"><b>{e.split()[0]}</b>{e.split()[1]}</div>' for e in t["eps"])
    body = f"""<h2 id="h">{t['h']}</h2>{pipe(t['steps'])}
<svg viewBox="0 0 1136 230"><polyline id="spark" points="{pts}" fill="none" stroke="#CDA860" stroke-width="4" stroke-linejoin="round"/></svg>
<div class="eps">{eps}</div>"""
    js = "const START=1;" + PIPE_JS + """
const SL=document.getElementById("spark").getTotalLength();
gsap.set("#spark",{strokeDasharray:SL,strokeDashoffset:SL});
tl.from("#h",{y:30,opacity:0,duration:.6,ease:"power3.out"},.2);
tl.to("#spark",{strokeDashoffset:0,duration:2.4,ease:"power1.inOut"},3.2);
tl.to(".ep",{opacity:1,duration:.4,stagger:.35},5.4);
"""
    return css, body, js


def mesh(t):
    import math
    rows, cols = 6, 10
    lines = []
    for r in range(rows):
        y = 30 + r * 64
        pts_w = " ".join(f"{40 + c * 116},{y + 22 * math.sin(c * 1.3 + r):.1f}" for c in range(cols))
        pts_s = " ".join(f"{40 + c * 116},{y}" for c in range(cols))
        lines.append(f'<polyline class="mr" points="{pts_w}"/><polyline class="ms" points="{pts_s}"/>')
    for c in range(cols):
        x = 40 + c * 116
        pts_w = " ".join(f"{x + 18 * math.sin(r * 1.1 + c):.1f},{30 + r * 64}" for r in range(rows))
        pts_s = " ".join(f"{x},{30 + r * 64}" for r in range(rows))
        lines.append(f'<polyline class="mr" points="{pts_w}"/><polyline class="ms" points="{pts_s}"/>')
    css = """
  svg{width:100%;height:380px}.mr{fill:none;stroke:#D36A76;stroke-width:2.5}.ms{fill:none;stroke:#CDA860;stroke-width:2.5;opacity:0}
  .cs{display:flex;gap:14px}.cs .chip{font-size:22px;opacity:0}
"""
    body = f"""<h2 id="h">{t['h']}</h2><svg viewBox="0 0 1136 380">{''.join(lines)}</svg>
<div class="cs">{''.join(f'<div class="chip" id="k{i}">{c}</div>' for i, c in enumerate(t['c']))}</div>"""
    js = """
tl.from("#h",{y:30,opacity:0,duration:.6,ease:"power3.out"},.2);
tl.from(".mr",{opacity:0,duration:.6,stagger:.03},.6);
tl.to(".mr",{opacity:0,duration:1.6,ease:"power2.inOut"},2.4);
tl.fromTo(".ms",{opacity:0,scale:1.04,transformOrigin:"50% 50%"},{opacity:1,scale:1,duration:1.6,ease:"power2.inOut"},2.6);

["k0","k1","k2"].forEach((id,i)=>tl.fromTo("#"+id,{opacity:0,y:14},{opacity:1,y:0,duration:.4},4.8+i*.35));
"""
    return css, body, js


def flownet(t):
    import math
    arrows = []
    for r in range(5):
        for c in range(12):
            x, y = 60 + c * 92, 50 + r * 70
            a = math.sin(c * 0.9 + r * 1.7) * 1.2
            arrows.append(f'<g class="ar" transform="translate({x} {y}) rotate({math.degrees(a):.0f})"><line x1="-24" y1="0" x2="20" y2="0"/><path d="M20 0 L10 -7 L10 7 Z"/></g>')
    css = """
  svg{width:100%;height:370px}.ar line{stroke:#D36A76;stroke-width:3}.ar path{fill:#D36A76}
  .cs{display:flex;gap:14px}.cs .chip{font-size:22px;opacity:0}
"""
    body = f"""<h2 id="h">{t['h']}</h2><svg viewBox="0 0 1136 370">{''.join(arrows)}
<path id="tr" d="M30 300 C300 300 400 120 568 180 S900 80 1110 90" fill="none" stroke="#CDA860" stroke-width="7" stroke-linecap="round"/></svg>
<div class="cs">{''.join(f'<div class="chip" id="k{i}">{c}</div>' for i, c in enumerate(t['c']))}</div>"""
    js = """
const TL_=document.getElementById("tr").getTotalLength();
gsap.set("#tr",{strokeDasharray:TL_,strokeDashoffset:TL_});
tl.from("#h",{y:30,opacity:0,duration:.6,ease:"power3.out"},.2);
tl.from(".ar",{opacity:0,duration:.3,stagger:.012},.6);
tl.to(".ar line",{stroke:"#8E8576",duration:.6},2.6);tl.to(".ar path",{fill:"#8E8576",duration:.6},2.6);
tl.to(".ar",{opacity:.25,duration:.6},3);
tl.to("#tr",{strokeDashoffset:0,duration:2,ease:"power2.inOut"},3);
["k0","k1","k2","k3"].forEach((id,i)=>tl.fromTo("#"+id,{opacity:0,y:14},{opacity:1,y:0,duration:.4},4.6+i*.3));
"""
    return css, body, js


BUILDERS = {"dropaudio": dropaudio, "reel-studio": reel, "monitoring": monitoring, "stabilization": stabilization,
            "voice": voice, "rif": rif, "bolsa": bolsa, "mesh": mesh, "flownet": flownet}


# --- Hero: fondo de 12 s sin texto, en bucle continuo (el último cuadro empalma con el primero) ---

def hero():
    import math
    W, H, P = 1920, 1080, 480  # P = período horizontal de las señales

    def trace(y0, amp, seed):
        pts = []
        for x in range(0, W + P + 1, 6):
            v = math.sin(2 * math.pi * x / P * 2 + seed) * 0.6 + math.sin(2 * math.pi * x / P * 5 + seed * 2) * 0.25 + math.sin(2 * math.pi * x / P * 9) * 0.15
            pts.append(f"{x},{y0 + amp * v:.1f}")
        return " ".join(pts)

    traces = "".join(
        f'<polyline class="tr t{i}" points="{trace(y, a, s)}"/>'
        for i, (y, a, s) in enumerate([(300, 40, 0.3), (560, 70, 1.4), (820, 30, 2.2)])
    )
    nodes = [(1250, 260), (1520, 180), (1720, 380), (1460, 470), (1640, 640), (1330, 720), (1780, 820)]
    edges = [(0, 1), (1, 2), (0, 3), (3, 2), (3, 4), (4, 6), (3, 5), (5, 4), (2, 6)]
    edge_svg, pk_svg = [], []
    for i, (a, b) in enumerate(edges):
        (x1, y1), (x2, y2) = nodes[a], nodes[b]
        L = math.hypot(x2 - x1, y2 - y1)
        edge_svg.append(f'<line class="ed" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}"/>')
        pk_svg.append(f'<line class="pk" data-l="{L:.1f}" data-o="{(i * 0.37 % 1) * L:.1f}" data-k="{1 + i % 3}" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" '
                      f'style="stroke-dasharray:22 {L - 22:.1f};stroke-dashoffset:{(i * 0.37 % 1) * L:.1f}"/>')
    node_svg = "".join(f'<circle class="nd" cx="{x}" cy="{y}" r="9"/><circle class="halo" cx="{x}" cy="{y}" r="9"/>' for x, y in nodes)

    return f"""<!doctype html>
<html lang="en"><head><meta charset="UTF-8" />
<meta name="viewport" content="width=1920, height=1080" />
<title>hero background</title>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>
  body {{ margin:0; background:#0C0B09; }}
  #root {{ position:relative; width:100%; height:100%; overflow:hidden;
    background:radial-gradient(ellipse at 75% 40%, #2b2011 0%, #0C0B09 60%); }}
  .grid {{ position:absolute; inset:-128px; opacity:.55;
    background-image:linear-gradient(rgba(205,168,96,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(205,168,96,.08) 1px,transparent 1px);
    background-size:64px 64px; }}
  .clip {{ position:absolute; inset:0; }}
  svg {{ position:absolute; inset:0; width:100%; height:100%; }}
  .tr {{ fill:none; stroke-width:2.2; stroke-linejoin:round; }}
  .t0 {{ stroke:rgba(205,168,96,.55); }} .t1 {{ stroke:rgba(226,196,127,.8); stroke-width:3; }} .t2 {{ stroke:rgba(211,106,118,.5); }}
  .ed {{ stroke:rgba(205,168,96,.28); stroke-width:2; }}
  .pk {{ stroke:#F0D79A; stroke-width:4; stroke-linecap:round; }}
  .nd {{ fill:#CDA860; }} .halo {{ fill:none; stroke:#CDA860; stroke-width:2; opacity:0; }}
  .sweep {{ position:absolute; top:0; bottom:0; width:220px; left:0;
    background:linear-gradient(90deg,transparent,rgba(205,168,96,.07),transparent); }}
</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-width="1920" data-height="1080" data-duration="12">
<section id="bg" class="clip" data-start="0" data-duration="12">
<div class="grid" id="grid"></div>
<svg viewBox="0 0 1920 1080"><g id="traces">{traces}</g>{''.join(edge_svg)}{''.join(pk_svg)}{node_svg}</svg>
<div class="sweep" id="sweep"></div>
</section></div>
<script>
const tl = gsap.timeline({{ paused: true }});
tl.fromTo("#grid",{{x:0,y:0}},{{x:-128,y:-64,duration:12,ease:"none"}},0);
tl.fromTo(".t0",{{x:0}},{{x:-{P},duration:12,ease:"none"}},0);
tl.fromTo(".t1",{{x:0}},{{x:-{2 * P},duration:12,ease:"none"}},0);
tl.fromTo(".t2",{{x:0}},{{x:-{P},duration:12,ease:"none"}},0);
document.querySelectorAll(".pk").forEach(el=>{{
  const L=+el.dataset.l, o=+el.dataset.o, k=+el.dataset.k;
  tl.fromTo(el,{{strokeDashoffset:o}},{{strokeDashoffset:o-k*L,duration:12,ease:"none"}},0);
}});
document.querySelectorAll(".halo").forEach((el,i)=>{{
  tl.fromTo(el,{{attr:{{r:9}},opacity:.7}},{{attr:{{r:34}},opacity:0,duration:2,ease:"power1.out",repeat:2,repeatDelay:2}},(i*0.6)%2);
}});
tl.fromTo("#sweep",{{x:-220}},{{x:1920,duration:6,ease:"none",repeat:1}},0);
window.__timelines["main"] = tl;
</script></body></html>
"""


root = Path(__file__).parent
(root / "hero").mkdir(exist_ok=True)
(root / "hero" / "index.html").write_text(hero(), encoding="utf-8")
print("escrito", root / "hero" / "index.html")

for name, per_lang in T.items():
    for lang, t in per_lang.items():
        css, body, js = BUILDERS[name](t)
        d = root / name / lang
        d.mkdir(parents=True, exist_ok=True)
        (d / "index.html").write_text(HEAD.format(lang=lang, title=f"{name} {lang}", css=css, body=body, js=js), encoding="utf-8")
        print("escrito", d / "index.html")
