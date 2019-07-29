import './product.scss';

export default function(product, store) {
  const el = document.createElement('div');
  el.className = `product ${product.path}`;
  
  const title = document.createElement('h2');
  title.innerHTML = product.name;

  const cta = document.createElement('button');
  cta.innerHTML = `Add (£${product.price})`;
  cta.onclick = handleClick(product, store);

  el.appendChild(title);
  el.appendChild(cta);

  return el;
}

function handleClick(product, store) {
  return () => {
    store.add(product);
  }
}