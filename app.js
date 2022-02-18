$(document).ready(function () {
  let date = new Date();
  let today = new Intl.DateTimeFormat("en-US").format(date);

  $("#time").html(`<h1>${today} CST</h1>`);
  //(1) button event
  var searchName = "";

  $("#submit").click(function () {
    searchName = document.querySelector("input").value;
    $("#header").slideUp(100);
    searchTV(searchName);
  });

  function searchTV(name) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=a820976f1791ff94b1f6f154d69ba742`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        //header with time and location

        let location = data.name;
        if (location === undefined) {
          location = "";
        } else {
          $("#location")
            .html(`<h1><e>${location}</h1><e>`)
            .slideUp(10)
            .slideDown(1000);
        }
        let country = data.sys.country;
        $("#country")
          .html(`<h3><e>${country}</h3><e>`)
          .slideUp(10)
          .slideDown(3000);

        //need add current time

        // temperture description pressure wind speed
        let currenttemp = (data.main.temp - 273.15).toFixed(1);
        $(".currentT")
          .html(`<h2>Current Tempeture: ${currenttemp} °C</h2>`)
          .slideUp(10)
          .slideDown(5000);
        // $(".currentT").fadeIn(); does not work
        let icon = data.weather[0].icon;
        $(".icon")
          .attr("src", `https://openweathermap.org/img/wn/${icon}@2x.png`)
          .hide(10)
          .show(2000);

        //may add covertion from C to F
        let maxtemp = (data.main.temp_max - 273.15).toFixed(1);
        let mintemp = (data.main.temp_min - 273.15).toFixed(1);
        let descri = data.weather[0].description;

        let windAngle = data.wind.deg;
        let winddirection = "";
        if (windAngle >= 0 && windAngle <= 90) {
          //just make 4 secection for now
          winddirection = "NE";
        } else if (windAngle > 90 && windAngle <= 180) {
          winddirection = "WN";
        } else if (windAngle > 180 && windAngle <= 270) {
          winddirection = "SW";
        } else winddirection = "SE";
        let windspeed = data.wind.speed.toFixed(1);

        $("#lowT")
          .html(`<h3><i>Lowest Temperature : ${mintemp} °C<i><h3>`)
          .slideUp(10)
          .slideDown(5000);
        $("#highT")
          .html(`<h3><i>Highest Temperature : ${maxtemp} °C<i><h4>`)
          .slideUp(10)
          .slideDown(5000);
        $("#des")
          .html(`<h3><i>Today Weather Most Likely : ${descri}<i><h3>`)
          .slideUp(10)
          .slideDown(5000);
        $("#wind")
          .html(`<h3><i>Wind Speed: ${windspeed} m/s ${winddirection}<i><h3>`)
          .slideUp(10)
          .slideDown(5000);
      })
      .catch((error) => alert("Can not find this location, please try again"));
  }
});
//background  setting
var scene = new THREE.Scene(); //all the object and light go（build the secene for display)
var camera = new THREE.PerspectiveCamera( //build the carmera sight to view the object
  75, //vertical field of view
  window.innerWidth / window.innerHeight, //the aspect ratio
  0.01, //near plane
  1000 //far plane     all here is default setting for most the 3D
);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor("#000000"); //background color of renderer
renderer.setSize(window.innerWidth, window.innerHeight); //size of the renderer,not browser
document.body.appendChild(renderer.domElement); //show the scene--->which is canvas at html
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});

camera.position.z = 1; //set camera position to view object

//add light to object

//build the cube
const geometry = new THREE.BoxGeometry(); //object for cube shape (it contain the vertices and faces)
const material = new THREE.MeshNormalMaterial({ wireframe: true }); //object color structure
// const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
mesh.scale.set(2, 2, 6);

const geometry2 = new THREE.BoxGeometry();
const material2 = new THREE.MeshNormalMaterial({ wireframe: true });
const mesh2 = new THREE.Mesh(geometry2, material2);
scene.add(mesh2);
mesh2.scale.set(2, 6, 2);

const geometry3 = new THREE.BoxGeometry();
const material3 = new THREE.MeshNormalMaterial({ wireframe: true }); //object color
const mesh3 = new THREE.Mesh(geometry3, material3);
scene.add(mesh3);
mesh3.scale.set(6, 2, 2);

// const controls = new OrbitControls(camera, renderer.domElement);

//add the light to the object
var light = new THREE.PointLight(0xafffff, 6, 500); //skycolor,groundcolot,intensity
light.position.set(2, 5, 50);
scene.add(light);

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 1;
controls.maxDistance = 1000;

function animate() {
  requestAnimationFrame(animate); //make the adjustment when we adjust the screen 60times per second 60 FPS
  mesh.rotation.x += 0.004;
  mesh.scale.x += 0.004; //add 0.1 everytime when the function is called
  mesh.rotation.y += 0.004;
  mesh.rotation.z += 0.004;
  mesh2.rotation.x += 0.004; //add 0.1 everytime when the function is called
  mesh2.rotation.y += 0.004;
  mesh2.scale.y += 0.004;
  mesh2.rotation.z += 0.004;
  mesh3.rotation.x += 0.004; //add 0.1 everytime when the function is called
  mesh3.rotation.y += 0.004;
  mesh3.rotation.z += 0.004;
  mesh3.scale.z += 0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();
