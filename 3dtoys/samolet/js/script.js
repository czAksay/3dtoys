var scene;
var camera;
var renderer;
var canvas;
var markMesh;

var x_l;
var y_l;
var z_l;

var view;

var extrudeSettings = {
    amount : 400,
    steps : 1,
    bevelEnabled: false,
    curveSegments: 30
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
    view = 1;
    var width = window.innerWidth;
    var height = window. innerHeight;
    canvas = document.getElementById('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    renderer = new THREE.WebGLRenderer({canvas: canvas, antualias: true});
    renderer.setClearColor(0x0674c1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width/height, 1, 5000);
    camera.position.set(75,70,750);
    var light = new THREE.AmbientLight(0xf1c02b, 0.38);
    
    //СЕТКА
    var grid = new THREE.GridHelper(1400, 30);
    grid.position.set(0,-47, 0);
    scene.add(grid);
    
    //ОСИ
    var axisHelper = new THREE.AxisHelper(1200);
    axisHelper.position.set(0,-47, 0);
    scene.add( axisHelper );
    
    //ЗЕМЛЯ
    var imgAerodrom = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture('src/aerodrom.jpg')});
    planeAerodrom = new THREE.Mesh(new THREE.PlaneGeometry(3900, 3900), imgAerodrom);
    rotateObject(planeAerodrom, -90, 0, 0);
    planeAerodrom.position.set(0, -1050, 0);
    scene.add(planeAerodrom);
    
    //ТРУБА
    var metal = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture('src/metal.jpg')});
    var arcShape = new THREE.Shape();
    arcShape.absarc(0, 0, 50, 0, Math.PI * 2, 1, false);
    var holePath = new THREE.Path();
    holePath.absarc(0, 0, 42, 0, Math.PI * 2, true);
    arcShape.holes.push(holePath);
    var geometry = new THREE.ExtrudeGeometry(arcShape, extrudeSettings);
    var body = new THREE.Mesh(geometry, metal);
    body.position.set(0,1000,-200);
    scene.add(body);
    //ТЕЛО
    var geoBody = new THREE.CylinderGeometry( 45, 45, 500, 35 );
    var bodyC = new THREE.Mesh(geoBody, metal);
    rotateObject(bodyC, 90, 0, 0);
    scene.add(bodyC);
    
    //ХВОСТ
    var geoHvost = new THREE.CylinderGeometry( 45, 4, 320, 35 );
    var hvostC = new THREE.Mesh(geoHvost, metal);
    rotateObject(hvostC, 90, 0, 0);
    hvostC.position.set(0,0,-408);
    scene.add(hvostC);
    
    
    //КРЫЛЬЯ
    flyP = new THREE.Mesh(new THREE.PlaneGeometry(900, 90), metal);
    rotateObject(flyP, -90, 0, 0);
    flyP.position.set(0, -10, 10);
    scene.add(flyP);
    
    //ХВОСТЕЦ
    var hv1 = new THREE.Mesh(new THREE.PlaneGeometry(60, 40), metal);
    hv1.position.set(0, 14, -530);
    var hv2 = new THREE.Mesh(new THREE.PlaneGeometry(60, 40), metal);
    hv2.position.set(0, 14, -530);
    rotateObject(hv1, 0, 90, 0);
    rotateObject(hv2, 0, -90, 0);
    scene.add(hv1);
    scene.add(hv2);
    
    //ХВОСТЕЦ2
    var hv3 = new THREE.Mesh(new THREE.PlaneGeometry(110, 60), metal);
    rotateObject(hv3, -90, 0, 0);
    hv3.position.set(0, 0, -530);
    scene.add(hv3);
    
    //КАБИНА
    var kabGeo = new THREE.SphereGeometry(45, 30, 30, 0, 1 * Math.PI, 0, 1.1 * Math.PI/2);
    kabGeo.scale(1,1,1.2);
    var kabMesh = new THREE.Mesh(kabGeo, metal);
    rotateObject(kabMesh, 0, 0, 180);
    kabMesh.position.set(0, 0, 250);
    scene.add(kabMesh);
    
    //СТЕКЛО КАБИНЫ
    var glassGeo = new THREE.SphereGeometry(44, 30, 30, 0, 1 * Math.PI, 0, 1.1 * Math.PI/2);
    glassGeo.scale(1,1,1.2);
    var glassColor = new THREE.LineBasicMaterial({ color : 0xc1fffb});
    var glassMesh = new THREE.Mesh(glassGeo, glassColor);
    glassMesh.position.set(0, 0, 250);
    scene.add(glassMesh);
    
    //СОЗДАТЬ МАРКЕР
    var markMat = new THREE.LineBasicMaterial({ color : 0x000000});
    markMesh = new THREE.Mesh(new THREE.CubeGeometry(30, 11, 1), markMat);
    markMesh.position.set(0,-10,280);
    scene.add(markMesh);
    
    
    scene.add(light);
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    renderer.render(scene, camera);
}


window.onmousemove = function()
{
    if (view == 2)
        {
            camera.lookAt(markMesh.position);
            camera.rotateSpeed = 0.1;
        }
    else
        {
            camera.lookAt(scene.position);
        }
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
    if(event.which == 99 || event.keyCode == 99)
    {
        if (view == 1)
            {
                camera.position.set(0, 0, 250);
                //camera.rotate.x = 90 * (Math.PI / 180);
                
                view = 2;
            }
        else
            {
                camera.position.set(75,70,750);
                //camera.lookAt(new THREE.Vector(0,0,0));
                view = 1;
            }
    }
    renderer.render(scene, camera);
}