console.log('Javasript Loaded');
const number = document.querySelector('input');
const form = document.querySelector('form');
const ul = document.querySelector('.list-group');
form.addEventListener('submit', (e) => {
  fetch(`http://localhost:3000/jokes?number=${number.value}`).then((response) => {
    response.json().then((data) => {
      if(data.Error){
        ul.innerHTML = '';
        liAppend(data.Error);
        document.querySelector('ul.list-group li').classList.add('text-danger');
        setTimeout(() => {
          ul.innerHTML = '';
          number.value = '';
        }, 3000);
      }
      else{
        ul.innerHTML = '<li id="heading" class="list-group-item active">Jokes</li>';
        document.querySelector('#heading').toggleAttribute("d-none");
        data.Jokes.forEach((jokeObject) => {
          liAppend(jokeObject.joke)  ;      
        });
        number.value = '';
      }  
    });
  });

  e.preventDefault();
});


const liAppend = (data) => {
  var li = document.createElement('li');
  li.className = "list-group-item";
  li.appendChild(document.createTextNode(data));
  ul.appendChild(li);
}