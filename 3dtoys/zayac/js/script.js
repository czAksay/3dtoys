var scene;
var camera;
var renderer;
var canvas;

var x_l;
var y_l;
var z_l;


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
    var width = window.innerWidth;
    var height = window. innerHeight;
    canvas = document.getElementById('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    renderer = new THREE.WebGLRenderer({canvas: canvas, antualias: true});
    renderer.setClearColor(0x552255);
    renderer.setPixelRatio(window.devicePixelRatio);
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
    planeGrass = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), imgGrass);
    rotateObject(planeGrass, -90, 0, 0);
    planeGrass.position.set(0, -50, 0);
    scene.add(planeGrass);
    
    //ТЕЛО
    var bodyColor = new THREE.LineBasicMaterial({ color : 0x552255});
    var bodyImg = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture('src/body.jpg')});
    var sphereBody = new THREE.Mesh(new THREE.SphereGeometry(100, 75, 75), bodyImg);
    rotateObject(sphereBody, 85, 90, 40);
    sphereBody.position.set(0, 75, 0);
    scene.add(sphereBody);
    
    //НОГИ
    var legColor = new THREE.LineBasicMaterial({ color : 0x999999});
    var lether = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture('src/lether.jpg')});
    var spGeo = new THREE.SphereGeometry(40, 30, 30, 0, 2 * Math.PI, 0, 1.22 * Math.PI/2);
    spGeo.scale(1,1,1.4);
    var sphereLeg1 = new THREE.Mesh(spGeo, lether);
    var sphereLeg2 = new THREE.Mesh(spGeo, lether);
    rotateObject(sphereLeg2, 6, 0, 0);
    rotateObject(sphereLeg1, 6, 0, 0);
    sphereLeg1.position.set(-50,-42,-16);
    sphereLeg2.position.set(50,-42,-16);
    scene.add(sphereLeg1);
    scene.add(sphereLeg2);
    
    //ЛИЦО
    var faceImg = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture('src/maks.png'), transparent: true});
    var faceText = new THREE.Texture(faceImg);
    var faceGeo = new THREE.SphereGeometry(65, 30, 30, 0, 1 * Math.PI, 0, 1.5 * Math.PI/2);
    var faceMesh = new THREE.Mesh(faceGeo, faceImg);
    rotateObject(faceMesh, 15, 0, 0);
    faceMesh.position.set(0, 72, 55);
    scene.add(faceMesh);
    
    //РУКИ
    var rukiImg = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture('src/kulak2.png'), transparent: true});
    var rukiImg2 = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture('src/kulak3.png'), transparent: true});
    var rukiGeo = new THREE.SphereGeometry(43, 30, 30, 0, 2 * Math.PI, 0, 2 * Math.PI/2);
    var sphereRuka1 = new THREE.Mesh(rukiGeo, rukiImg2);
    var sphereRuka2 = new THREE.Mesh(rukiGeo, rukiImg);
    sphereRuka1.position.set(-110,30,-24);
    rotateObject(sphereRuka1, 0, -195, 0);
    sphereRuka2.position.set(110,30,9);
    rotateObject(sphereRuka2, 0, 15, 0);
    scene.add(sphereRuka1);
    scene.add(sphereRuka2);
    
    //УШИ
    var heartShape = new THREE.Shape();
    heartShape.moveTo( 25, 25, 25 );
    heartShape.bezierCurveTo( 100, 110, 10, 200, 0, 0 );
    var mehImg = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture('src/meh.jpg')});
    var extrudeSettings = { amount: 2, bevelEnabled: true, bevelSegments: 10, steps: 0, bevelSize: 0, bevelThickness: 2 };
    var geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
    var uho1 = new THREE.Mesh( geometry, mehImg );
    var uho2 = new THREE.Mesh( geometry, mehImg );
    uho1.position.set(25, 105,90);
    uho2.position.set(-25, 105,90);
    rotateObject(uho2, 0, 180, 0);
    scene.add(uho1);
    scene.add(uho2);
    scene.add(light);
    
    var pointL = new THREE.PointLight(0xff19e1, 2.3, 850);
    pointL.position.set(0,20,-120);
    scene.add(pointL);
    
    var spotL = new THREE.SpotLight(0xfff287, 1);
    spotL.position.set(0, 160,175);
    rotateObject(spotL, -80,0,0);
    scene.add(spotL);
    
    
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    renderer.render(scene, camera);
}


window.onmousemove = function()
{
    renderer.render(scene, camera);
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
    
}