const modal=document.getElementById('product-modal');
const title=document.querySelector('.modal-title');
const img=document.querySelector('.modal-img');
const desc=document.querySelector('.modal-desc');

const data={
 wine:{title:"Wine's glass",img:"images/wine.jpg",desc:"Сумка из акриловых бусин"},
 glamor:{title:"Glamor",img:"images/glamor.jpg",desc:"Стильная сумка из бусин"}
};

document.querySelectorAll('.card').forEach(c=>{
 c.onclick=()=>{
  const id=c.dataset.product;
  title.textContent=data[id].title;
  img.src=data[id].img;
  desc.textContent=data[id].desc;
  modal.classList.remove('hidden');
 };
});

document.querySelector('.close').onclick=()=>modal.classList.add('hidden');
modal.onclick=e=>{if(e.target===modal)modal.classList.add('hidden');};
