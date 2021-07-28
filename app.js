const btns = document.querySelector('.btn-container');
const dataContainer = document.querySelector('.data-section');



const fetchUsers = () =>{
    // fetch needs the url
    fetch('https://reqres.in/api/users').then(response=>{
        //fetch will not go to catch if you get a 404 error
        if(!response.ok){
            throw Error('Not a 200 status code. Error!');
        }
       return response.json();
    })
    .then(userData=> {
        //console.log(userData.data);
        displayItems(userData.data);
        
    })
    .catch(err=>{
        console.log(err);
    });
}

const displayItems = dataItems =>{
    // create fake profile that has no last name.
    let example = {
        id:7,
        email: 'fakeEmail@hello.com',
        first_name: 'Albert',
        last_name: 'Hoo',
        avatar: './fakerton.jpeg'
    };
    dataItems.push(example);
    //console.log(dataItems);
    const occ = ['Writer', 'Editor', 'Associate', 'Designer'];
    for(let item in dataItems){
        dataItems[item].occupation = occ[Math.floor(Math.random()*occ.length)];

        console.log(dataItems[item]);
    }
    displayBtns(dataItems);
    let data = dataItems.map(item=>{
        return(
            `<article class='menuItem'>
                <img src=${item.avatar} alt='profile picture' />
                <div class='profileInfo'>
                    <h4>  
                    ${item.first_name}
                    ${item.last_name}
                    </h4>
                    <p>${item.email}</p>
                    <p>${item.occupation}</p>
                </div>
            </article>`
        );
    });
    let display = data.join('');
    dataContainer.innerHTML = display;
};

const displayBtns = dataItems =>{
    const careers = dataItems.reduce((initial, next)=>{
        if(!initial.includes(next.occupation)){
            initial.push(next.occupation);
        }
        return(initial);
    }, ['all']);

    const categoryBtns = careers.map(category=>{
        return(
            `<button class='filter-btn' type="button" data-id=${category}>${category}</button>`);
      }).join('');

    const filterBtns = document.querySelectorAll('.filter-btn');
  // filter buttons 
  filterBtns.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
      const category = e.currentTarget.dataset.id;
      //console.log(category);
      const menuCategory = dataItems.filter(item=>{
        if(item.category === category){
          return item;
        }
      }); 
      if(category === 'all'){
        displayItems(dataItems);
      }
      else{
        displayItems(menuCategory);
      }
    });
    });
};



fetchUsers();