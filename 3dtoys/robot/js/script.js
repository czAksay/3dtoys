var scene;
var camera;
var renderer;
var canvas;
var clock;  
var water;

var x_l;
var y_l;
var z_l;
var backgroundImage = [];
var curr_slide;
var filmPlane;
var can_show_next;

var time_gone;
var time_st;
var time_end;

var params = {
			color: '#ffffff',
			scale: 4,
			flowX: 1,
			flowY: 1
		};

function setPoint(x,y,z)
{
    x_l = x;
    y_l = y;
    z_l = z; 
}

function drawLine(x, y, z)
{
    var mat = new THREE.LineBasicMaterial({color:0xff44ff});
    var geo = new THREE.Geometry();
    var p1 = new THREE.Vector3(x_l,y_l,z_l);
    var p2 = new THREE.Vector3(x,y,z);
    x_l = x;
    y_l = y;
    z_l = z;
    geo.vertices.push( p1 );
    geo.vertices.push( p2 );
    var line = new THREE.Line(geo,mat);
    scene.add(line);
}


window.onload = function()
{
    for (i= 0; i<=22; i++)
        {
            backgroundImage[i] = THREE.ImageUtils.loadTexture("src/film/tmp-"+(i*3)+".gif");
        }
    curr_slide = 0;
    can_show_next = true;
    
    
    var width = window.innerWidth;
    var height = window. innerHeight;
    canvas = document.getElementById('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    renderer = new THREE.WebGLRenderer({canvas: canvas, antualias: true});
    renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( renderer.domElement );
    renderer.setClearColor(0x75bbfd );
    renderer.setSize(width, height);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 5000);
    camera.position.set(75,70,750);
    var light = new THREE.AmbientLight(0xffffff, 0.44);
    
    //СЕТКА
    var grid = new THREE.GridHelper(1400, 30);
    grid.position.set(0,-47, 0);
    scene.add(grid);
    
    //ОСИ
    var axisHelper = new THREE.AxisHelper(1200);
    axisHelper.position.set(0,-47, 0);
    scene.add( axisHelper );
    
    //ТРАВА
    var imgGrass = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture('src/grass.jpg')});
    planeGrass = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), imgGrass);
    rotateObject(planeGrass, -90, 0, 0);
    planeGrass.position.set(0, -50, 0);
    scene.add(planeGrass);
    
    
    //ТЕЛО
    var metal = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture('src/metal.jpg')});
    var geoBody = new THREE.CylinderGeometry( 38, 38, 110, 35 );    
    var bodyC = new THREE.Mesh(geoBody, metal);
    bodyC.position.set(0, 35, 0);
    rotateObject(bodyC,0,180,0);
    scene.add(bodyC);
    
    
    //НОГИ
    var legColor = new THREE.LineBasicMaterial({ color : 0x999999});
    var lether = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture('src/lether.jpg')});
    var spGeo = new THREE.SphereGeometry(40, 30, 30, 0, 2 * Math.PI, 0, 1.22 * Math.PI/2);
    spGeo.scale(0.4,1,1.2);
    var sphereLeg1 = new THREE.Mesh(spGeo, lether);
    var sphereLeg2 = new THREE.Mesh(spGeo, lether);
    rotateObject(sphereLeg2, 6, 0, 0);
    rotateObject(sphereLeg1, 6, 0, 0);
    sphereLeg1.position.set(-40,-42,4);
    sphereLeg2.position.set(40,-42,4);
    scene.add(sphereLeg1);
    scene.add(sphereLeg2);
    
    
    //ГОЛОВА
    var spGeo = new THREE.SphereGeometry(40, 75, 75, 0, 2 * Math.PI, 0, 1.16 * Math.PI/2);
    var sphereBody = new THREE.Mesh(spGeo, metal);
    //rotateObject(sphereBody, 85, 90, 40);
    sphereBody.position.set(0, 105, 0);
    scene.add(sphereBody);
    
    
    //РУКИ
    handMesh = new THREE.Mesh(new THREE.CubeGeometry(8, 90, 30), metal);
    handMesh2 = new THREE.Mesh(new THREE.CubeGeometry(8, 90, 30), metal);
    handMesh.position.set(45, 40,0);
    //handMesh2.position.set(-55, 85,35);
    handMesh2.position.set(-55, 40,15);
    //rotateObject(handMesh2, 60, 90, 0);
    rotateObject(handMesh2, -20, 90, 0);
    scene.add(handMesh);
    scene.add(handMesh2);
    
    //ГЛАЗА
    var eyeColor = new THREE.LineBasicMaterial({ color : 0x00FF00});
    var eye1 = new THREE.Mesh(new THREE.CubeGeometry(15, 4, 2), eyeColor);
    eye1.position.set(15, 110,40);
    var eye2 = new THREE.Mesh(new THREE.CubeGeometry(15, 4, 2), eyeColor);
    var eye1_1 = new THREE.Mesh(new THREE.CubeGeometry(4, 15, 2), eyeColor);
    eye2.position.set(-15, 110,40);
    eye1_1.position.set(15, 110,40);
    scene.add(eye1);
    scene.add(eye1_1);
    scene.add(eye2);
    
    //УСИКИ
    var usGeo = new THREE.CylinderGeometry( 1, 2, 55, 35 );    
    var us1 = new THREE.Mesh(usGeo, metal);
    var us2 = new THREE.Mesh(usGeo, metal);
    us1.position.set(20, 165, 0);
    us2.position.set(-20, 165, 0);
    rotateObject(us1, 0, 0, -20);
    rotateObject(us2, 0, 0, 20);
    scene.add(us1);
    scene.add(us2);
    
    
    //СФЕРЫ УСИКОВ
    var sphColor = new THREE.LineBasicMaterial({ color : 0xfff000, transparent: true, opacity: 0.3});
    var uss1 = new THREE.Mesh(new THREE.SphereGeometry(6, 75, 75), sphColor);
    var uss2 = new THREE.Mesh(new THREE.SphereGeometry(6, 75, 75), sphColor);
    uss1.position.set(30, 195, 0);
    uss2.position.set(-30, 195, 0);
    scene.add(uss1);
    scene.add(uss2);
    
    
    //ТЕЛЕВИЗОР
    var wood = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture('src/wood.jpg')});
    tv = new THREE.Mesh(new THREE.CubeGeometry(60, 50, 20), metal);
    tv.position.set(0,40,28);
    scene.add(tv);
    film2 = new THREE.MeshLambertMaterial({map:backgroundImage[0]});
    filmPlane = new THREE.Mesh(new THREE.PlaneGeometry(45, 39), film2);
    filmPlane.position.set(-5, 41, 38.2);
    filmPlane.material.needsUpdate = true;
    film2.needsUpdate = true;
    scene.add(filmPlane);
    var tvMat = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture('src/tv.png'), transparent: true});
    tvpl = new THREE.Mesh(new THREE.PlaneGeometry(60, 50), tvMat);
    tvpl.position.set(0, 40, 38.5);
    tvpl.needsUpdate = true;
    scene.add(tvpl);
    
    

    scene.add(light);
    renderer.render(scene, camera);
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    window.addEventListener( 'resize', onResize, false );
    
    time_gone = 0;
    time_st =  new Date().getMilliseconds();
    time_end = 0;
    
    
    setInterval(function() {
    can_show_next = true;
    }, 180);
    
    
    animate();
}



function onResize() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}

		function animate() {
			requestAnimationFrame( animate );
			render();
		}

		function rend() {
			var delta = clock.getDelta();
			
}



window.onmousemove = function()
{
    renderer.render(scene, camera);
}


function render()
{
    renderer.render(scene, camera);
    if (can_show_next == true)
    {
        curr_slide++;
        if (curr_slide >= 22)
            {
                curr_slide = 0;
            }
        //renderer.render(scene, camera);
        filmPlane.material.map =  backgroundImage[curr_slide] ;
        //filmPlane.material.map = THREE.ImageUtils.loadTexture( "src/film/tmp-"+(curr_slide*3)+".gif" );
        renderer.render(scene, camera);
        renderer.render(scene, camera);
        renderer.render(scene, camera);
        renderer.render(scene, camera);
        renderer.render(scene, camera);
        can_show_next = false;
        //renderer.render(scene, camera);
    }
    //renderer.render(scene, camera);
}

function allow_next()
{
    can_show_next = true;
}



function rotateObject(object,degreeX=0, degreeY=0, degreeZ=0){

   degreeX = (degreeX * Math.PI)/180;
   degreeY = (degreeY * Math.PI)/180;
   degreeZ = (degreeZ * Math.PI)/180;

   object.rotateX(degreeX);
   object.rotateY(degreeY);
   object.rotateZ(degreeZ);

}

window.onkeypress = function()
{
    if(event.keyCode == 99)
    {
                 capturer.stop();
                capturer.save();
    }
}