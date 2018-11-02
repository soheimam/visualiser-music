var startButton = document.getElementById( 'play' );
console.log(startButton)
startButton.addEventListener( 'click', init );

function init() {
//setting the scene, establishing a  camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(100,
    window.innerWidth/window.innerHeight, 10, 1000 );
    camera.position.z = 30;
    var renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight)
    renderer.setClearColor(0x000000, 1);

//Appending the renderer to the body of the HTML
document.body.appendChild( renderer.domElement );
//creating a new orbit instance
var orbit = new THREE.OrbitControls( camera, renderer.domElement );
orbit.enableZoom = false;

//adding lights to the scene
var lights = [];
                lights[ 0 ] = new THREE.PointLight( 0x660000, 1, 0 );
                lights[ 1 ] = new THREE.PointLight( 0x660000, 1, 0 );
                lights[ 2 ] = new THREE.PointLight( 0x660000, 1, 0 );
                lights[ 0 ].position.set( 0, 200, 0 );
                lights[ 1 ].position.set( 100, 200, 100 );
                lights[ 2 ].position.set( - 100, - 200, - 100 );
                scene.add( lights[ 0 ] );
                scene.add( lights[ 1 ] );
                scene.add( lights[ 2 ] );
var ambientLight  = new THREE.AmbientLight( '#FFE7FF' ),
                hemiLight     = new THREE.HemisphereLight('#FFE7FF', '#FFE7FF', 0.5 ),
                light         = new THREE.PointLight( '#FFE7FF', 1, 100 );

hemiLight.position.set( 0, 0, 10 );
light.position.set( 0, 0, 0 );

scene.add( hemiLight );

// create a new group that will allow us to create sub groups of items within a scene

//THREE.sphere(radius, [detailX], [detailY]) 
var geometry = new THREE.SphereGeometry(10, 250, 250);
var material = new THREE.MeshLambertMaterial( { color: 0xCCB4E0, opacity:0.5, transparent:true, wireframe:true, emissive: 0xFFB4E0,emissiveIntensity:0.6} );
var sphereOne = new THREE.Mesh( geometry, material );

// create a new sphere with geometry radius 10 and 250 faces
var sphereOne = new THREE.Mesh(geometry, material);
sphereOne.position.x =0;
sphereOne.position.y =0;
sphereOne.position.z =0;
scene.add(sphereOne);


// make a THREE.js loader
const loader = new THREE.TextureLoader()
// make stars
const makeStars = function (url, maxNum) {
    const texture = loader.load(url)
    const geometry = new THREE.Geometry()
    
    for (let i = 0; i < maxNum; i = i + 1) {
      const point = new THREE.Vector3()
      const sphericalPoint = new THREE.Spherical(
          900 + Math.random() * 900,
        2 * Math.PI * Math.random(),
        Math.PI * Math.random()
      )
      
      point.setFromSpherical(sphericalPoint)
      
      geometry.vertices.push(point)
    }


const material = new THREE.PointsMaterial({
        size: 50,
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: true,
        depthWrite: false
      })
      
      const points = new THREE.Points(geometry, material)
      
      scene.add(points)
      
      return points
    }   
    makeStars("../assets/images/particle.png", 1000);



// adding the musical component to our scene, using THREE.JS audio analyzer
var prevFog = true;
var fftSize = 128;
var listener = new THREE.AudioListener();
var audio = new THREE.Audio( listener );
var mediaElement = new Audio( '../assets/music/song.mp3' );
mediaElement.loop = true;
                
mediaElement.play();
audio.setMediaElementSource( mediaElement );
                analyser = new THREE.AudioAnalyser( audio, fftSize );
                var render = function () {
                    requestAnimationFrame( render );
                    noise.seed(Math.random());
                    var sum = analyser.data.reduce(function(a,b){return a+b;});
                    var avg = sum/analyser.data.length;
                    sphereOne.geometry.vertices.forEach(function(i){
                        var noisy = noise.simplex3(i.x,i.y,i.z)*0.0002;
                        i.x+=noisy*avg;
                        i.y+=noisy*avg;
                        i.z+=noisy*avg;
                        
                    });
                    // console.log(avg);
                    sphereOne.rotation.x += 0.0003*avg;
                    sphereOne.rotation.y += 0.0003*avg;
                    sphereOne.rotation.z += 0.0003*avg;
                    analyser.getFrequencyData();
                    // var sum = analyser.data.reduce(function(a,b){return a+b;});
                    // var avg = sum/analyser.data.length;
                    // console.log(avg);
                    orbit.update();
                    sphereOne.geometry.verticesNeedUpdate = true;
                    renderer.render( scene, camera );
                };
                window.addEventListener( 'resize', function () {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    
                    renderer.setSize( window.innerWidth, window.innerHeight );
                }, false );


                
                
                render();
        }
    