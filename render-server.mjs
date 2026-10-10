import http from 'node:http';
import site from './worker/index.js';
const upstream = new URL(process.env.CONTENT_ORIGIN || 'https://idomatech-community.earlylark1.chatgpt.site');
const port=Number(process.env.PORT||3000);
const send=(res,status,body,headers={})=>{res.writeHead(status,{'X-Content-Type-Options':'nosniff',...headers});res.end(body)};
export const server=http.createServer(async(req,res)=>{
 try{
 const path=new URL(req.url,'http://localhost');
 if(path.pathname==='/health')return send(res,200,'ok',{'Content-Type':'text/plain'});
 if(path.pathname==='/admin'||path.pathname.startsWith('/api/admin'))return send(res,302,'',{'Location':new URL('/admin',upstream).href});
 if(path.pathname==='/'&&req.method==='GET'){
 const response=await site.fetch(new Request('https://render.local/'),{});
 let html=await response.text();
 html=html.replace(/<form id="join-form">[\s\S]*?<\/form>/,'<div><h3>Introduce yourself to ITC.</h3><p>Our membership enquiry form opens in the community’s secure contact area.</p><a class="btn" href="'+new URL('/#join',upstream).href+'">Open membership enquiries ↗</a></div>');
 html=html.replace("$('#join-form').onsubmit=","const joinForm=$('#join-form');if(joinForm)joinForm.onsubmit=");
 html=html.replace('</body>',`<script>document.querySelector('#admin-open').onclick=()=>{location.href=${JSON.stringify(new URL('/admin',upstream).href)}};</script></body>`);
 return send(res,200,html,Object.fromEntries(response.headers));
 }
 if((path.pathname==='/api/content'&&req.method==='GET')||(/^\/media\/[a-f0-9-]+\.(jpg|png|webp)$/.test(path.pathname)&&req.method==='GET')){
 const response=await fetch(new URL(path.pathname,upstream),{method:req.method,headers:{'Content-Type':'application/json',Origin:upstream.origin},signal:AbortSignal.timeout(20000),redirect:'error'});
 const headers={'Content-Type':response.headers.get('Content-Type')||'application/octet-stream','Cache-Control':path.pathname.startsWith('/media/')?'public,max-age=31536000,immutable':'no-store'};
 return send(res,response.status,Buffer.from(await response.arrayBuffer()),headers);
 }
 send(res,404,'Not found',{'Content-Type':'text/plain'});
 }catch(e){console.error('Request failed:',e.message);send(res,502,JSON.stringify({error:'Unable to connect to community storage. Please try again.'}),{'Content-Type':'application/json'})}
});
if(process.env.NODE_ENV!=='test')server.listen(port,'0.0.0.0',()=>console.log(`ITC listening on port ${port}`));
