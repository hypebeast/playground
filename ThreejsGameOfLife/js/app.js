var stats, scene, renderer;
var camera, cameraControls;

var livingSpaceWidth = 10;
var livingSpaceHeigth = 10;
var livingSpaceDepth = 10;
//var livingSpace = new Array(livingSpaceWidth);
var livingSpace;

function Creature(geometry, material, healthStatus) {
  var self = this;
  self.cubeGeometry = geometry;
  self.material = material;
  self.healthStatus = healthStatus;
}

if( !init() ) animate();

// init the scene
function init(){

  if( Detector.webgl ){
    renderer = new THREE.WebGLRenderer({
      antialias: true, // to get smoother output
      preserveDrawingBuffer: true // to allow screenshot
    });
    renderer.setClearColorHex( 0xEEEEEE, 1 );
  }else{
    renderer = new THREE.CanvasRenderer();
  }

  renderer.setSize( window.innerWidth, window.innerHeight );
  document.getElementById('container').appendChild(renderer.domElement);

  // add Stats.js - https://github.com/mrdoob/stats.js
  stats = new Stats();
  stats.domElement.style.position	= 'absolute';
  stats.domElement.style.bottom	= '0px';
  document.body.appendChild( stats.domElement );

  // create a scene
  scene = new THREE.Scene();

  // put a camera in the scene
  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set(0, 0, 700);
  scene.add(camera);

  // create a camera contol
  //cameraControls = new THREEx.DragPanControls(camera);
	cameraControls = new THREE.TrackballControls( camera );

  // transparently support window resize
  THREEx.WindowResize.bind(renderer, camera);

  // allow 'p' to make screenshot
  THREEx.Screenshot.bindKey(renderer);

  // allow 'f' to go fullscreen where this feature is supported
  if( THREEx.FullScreen.available() ){
    THREEx.FullScreen.bindKey();
    document.getElementById('inlineDoc').innerHTML += "- <i>f</i> for fullscreen";
  }

  var light = new THREE.AmbientLight(  0.1 * 0xffffff );
  scene.add( light );

  light = new THREE.DirectionalLight( Math.random() * 0xffffff );
  light.position.set( Math.random(), Math.random(), Math.random() ).normalize();
  scene.add( light );

  light = new THREE.DirectionalLight( Math.random() * 0xffffff );
  light.position.set( Math.random(), Math.random(), Math.random() ).normalize();
  scene.add( light );

  light = new THREE.PointLight( Math.random() * 0xffffff );
  light.position.set( Math.random()-0.5, Math.random()-0.5, Math.random()-0.5 ).normalize().multiplyScalar(1.2);
  scene.add( light );

  light = new THREE.PointLight( 0xffffff );
  light.position.set( Math.random()-0.5, Math.random()-0.5, Math.random()-0.5 ).normalize().multiplyScalar(1.2);
  scene.add( light );

  // Initialize the living space
  initLivingSpace();
}

// animation loop
function animate() {

  // loop on request animation loop
  // - it has to be at the begining of the function
  // - see details at http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  requestAnimationFrame( animate );

  // do the render
  render();

  // calculate the next generation
  //calculateNextGeneration();

  // update stats
  stats.update();
}

// render the scene
function render() {

  // update camera controls
  cameraControls.update();

  // Draw living space
  drawLivingSpace();

  // actually render the scene
  renderer.render( scene, camera );

  // calculate the next generation
  //calculateNextGeneration();
}

function initLivingSpace() {
  var posX, posY;

  for(var i = 0; i < livingSpaceWidth; i++) {
    livingSpace[i] = new Array(livingSpaceHeigth);
    posY = -100 + i * 23;

    for(var j = 0; j < livingSpaceHeigth; j++) {
      livingSpace[i][j] = new Array(livingSpaceDepth);
      posX = -100 + j * 23;

      for(var z = 0; z < livingSpaceDepth; z++) {
        var healthStatus = 0;
        var randnumber = Math.random();
        if(randnumber >= 0.8) {
          healthStatus = 1000.0;
        } else {
          healthStatus = 0.0;
        }

        var geometry = new THREE.CubeGeometry(15,15,15);
        var material = new THREE.MeshLambertMaterial({
          ambient: 0x808080,
          color: 0xff0000,
          opacity: healthStatus / 1000.0,
          transparent: true
        });

        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = posX;
        mesh.position.y = posY;
        mesh.position.z = 23 * z;
        scene.add( mesh );

        livingSpace[i][j][z] = new Creature(geometry, material, healthStatus);
      }
    }
  }
}

function calculateNextGeneration() {
  var neighborCount = new Array(livingSpaceWidth);

  for(var x = 0; x < livingSpaceWidth; x++) {
    neighborCount[x] = new Array(livingSpaceHeigth);

    for(var y = 0; y < livingSpaceHeigth; y++) {
      neighborCount[x][y] = new Array(livingSpaceDepth);

      for(var z = 0; z < livingSpaceDepth; z++) {
        neighborCount[x][y][z] = getNeighborCount(x, y, z);
      }
    }
  }

  for(x = 0; x < livingSpaceWidth; x++) {
    for(y = 0; y < livingSpaceHeigth; y++) {
      for(z = 0; z < livingSpaceDepth; z++) {
        if (6 <= neighborCount[x][y][z] <= 11) {
          if (neighborCount[x][y][z] == 8) {
            // A creature is born
            livingSpace[x][y][z].healthStatus = 1000;
          }
        } else {
          // Creature dies slowly
          livingSpace[x][y][z].healthStatus = livingSpace[x][y][z].healthStatus / 1.5;
        }

        if (livingSpace[x][y][z].healthStatus < 200) {
          livingSpace[x][y][z].healthStatus = 0;
        }
      }
    }
  }
}

function getNeighborCount(x, y, z) {
  var count = 0;

  var xpn = (x + 1) % livingSpaceWidth;
  var ypn = (y + 1) % livingSpaceHeigth;
  var zpn = (z + 1) % livingSpaceDepth;

  count += isAlive(x, ypn, z - 1);
  count += isAlive(xpn, ypn, z - 1);
  count += isAlive(xpn, y, z - 1);
  count += isAlive(xpn, y - 1, z - 1);
  count += isAlive(x, y - 1, z - 1);
  count += isAlive(x - 1, y - 1, z -1);
  count += isAlive(x - 1, y, z - 1);
  count += isAlive(x - 1, ypn, z - 1);

  count += isAlive(x, ypn, z);
  count += isAlive(xpn, ypn, z);
  count += isAlive(xpn, y, z);
  count += isAlive(xpn, y - 1, z);
  count += isAlive(x, y - 1, z);
  count += isAlive(x - 1, y - 1, z);
  count += isAlive(x - 1, y, z);
  count += isAlive(x - 1, ypn, z);

  count += isAlive(x, ypn, zpn);
  count += isAlive(xpn, ypn, zpn);
  count += isAlive(xpn, y, zpn);
  count += isAlive(xpn, y - 1, zpn);
  count += isAlive(x, y - 1, zpn);
  count += isAlive(x - 1, y - 1, zpn);
  count += isAlive(x - 1, y, zpn);
  count += isAlive(x - 1, ypn, zpn);

  count += isAlive(x, y, zpn);
  count += isAlive(x, y, z - 1);

  return count;
}

function isAlive(x, y, z) {
  var creature = livingSpace[x][y][z];
  return creature.healthStatus == 1000;
}

function drawLivingSpace() {
  for (var x = 0; x < livingSpaceWidth; x++) {
    for (var y = 0; y < livingSpaceHeigth; y++) {
      for (var z = 0; z < livingSpaceDepth; z++) {
        if (livingSpace[x][y][z].healthStatus > 0) {
          var healthStatus = livingSpace[x][y][z].healthStatus;

          if (z % 2) {
            livingSpace[x][y][z].healthStatus = healthStatus;
            livingSpace[x][y][z].material.color = 0xff0000;
          } else if (z % 3) {
            livingSpace[x][y][z].healthStatus = healthStatus;
            livingSpace[x][y][z].material.color = 0x00ff00;
          } else {
            livingSpace[x][y][z].healthStatus = healthStatus;
            livingSpace[x][y][z].material.color = 0x0000ff;
          }
        }
      }
    }
  }
}
