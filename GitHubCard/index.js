/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/
const followersArray = [
  "raegdev",
  "amberchunn",
  "xpinero",
  "weinerjm14",
  "Eloy2",
  "MystiDyse",
  "Cobrettie"
];
/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function githubCards(gitCard) {
  const cardClass = document.createElement("div");
  cardClass.classList.add("card");

  const imgSrc = document.createElement("img");

  const infoClass = document.createElement("div");
  infoClass.classList.add("card-info");

  const nameElement = document.createElement("h3");
  nameElement.classList.add("name");

  const userName = document.createElement("p");
  userName.classList.add("username");

  const locate = document.createElement("p");

  const profileElement = document.createElement("p");

  const link = document.createElement("a");

  const followersElement = document.createElement("p");

  const followingElement = document.createElement("p");

  const bioElement = document.createElement("p");

  cardClass.appendChild(imgSrc);
  cardClass.appendChild(infoClass);
  infoClass.appendChild(nameElement);
  infoClass.appendChild(userName);
  infoClass.appendChild(locate);
  infoClass.appendChild(profileElement);
  profileElement.appendChild(link);
  infoClass.appendChild(followersElement);
  infoClass.appendChild(followingElement);
  infoClass.appendChild(bioElement);

  imgSrc.src = gitCard.avatar_url;
  nameElement.textContent = gitCard.name;
  userName.textContent = gitCard.login;
  locate.textContent = `Location: ${gitCard.location}`;
  profileElement.textContent = `Profile: ${gitCard.html_url}`;
  link.textContent = `Link: ${gitCard.html_url}`;
  followersElement.textContent = `Followers: ${gitCard.followers}`;
  followingElement.textContent = `Following: ${gitCard.following}`;
  bioElement.textContent = `Bio: ${gitCard.bio}`;

  return cardClass;
}

const entryPoint = document.querySelector(".cards");

axios
  .get("https://api.github.com/users/Laurareed5")
  .then(response => {
    entryPoint.append(githubCards(response.data));
  })
  .catch(error => {
    console.log("the data was not returned", error);
  });



// followersArray.forEach(follower => {
//   axios
//     .get(`https://api.github.com/users/Laurareed5/followers`)
//     .then(response => {
//       console.log(response);
//       entryPoint.append(githubCards(response.data));
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

axios
  .get("https://api.github.com/users/Laurareed5/followers")
  .then(response => {
    // console.log(response);
    response.data.forEach(follower => {
      axios
        .get(follower.url)
        .then(followerResponse => {
          // console.log(followerResponse);
          entryPoint.append(githubCards(followerResponse.data));
        })
        .catch(followerError => {
          console.log(followerError);
        });
    });
  })
  .catch(error => {
    console.log(error);
  });



/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
