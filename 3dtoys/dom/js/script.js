var scene;
var camera;
var renderer;

var x_l;
var y_l;
var z_l;
var vis;

var plane6;
var plane5;
var plane4;
var plane3;
var plane2;
var plane;

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
    vis = true;
    var width = window.innerWidth;
    var height = window. innerHeight;
    var canvas = document.getElementById('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    
    renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0x552255);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 5000);
    camera.position.set(75,70,750);
    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
    var geometry = new THREE.PlaneGeometry(100,100,10,10);      //геометрия, форма, сама плоскость
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true}); //из чего она состояит, цвет, пленка
    var mesh = new THREE.Mesh(geometry, material);      //сам меш.
    var img = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
        map:THREE.ImageUtils.loadTexture('scr/maksimov.jpg')
    });
    var img2 = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
        map:THREE.ImageUtils.loadTexture('scr/maks.png')
    });
    img.map.needsUpdate = true;
    plane = new THREE.Mesh(new THREE.PlaneGeometry(150, 150),img);
    plane.overdraw = true;
    plane.position.set(75, 75, 0);
    plane2 = new THREE.Mesh(new THREE.PlaneGeometry(50, 50),img);
    plane3 = new THREE.Mesh(new THREE.PlaneGeometry(800, 800),img2);
    plane4 = new THREE.Mesh(new THREE.PlaneGeometry(150, 150),img);
    plane5 = new THREE.Mesh(new THREE.PlaneGeometry(150, 150),img);
    plane6 = new THREE.Mesh(new THREE.PlaneGeometry(150, 150),img);
    plane2.overdraw = true;
    plane4.overdraw = true;
    plane3.overdraw = true;
    plane2.position.set(75, 75, 1);
    plane4.position.set(0, 75, 75);
    plane5.position.set(150, 75, 75);
    plane6.position.set(75, 75, 150);
    plane3.position.set(75, 0, 1);
    //plane3.rotate.set(90);
    rotateObject(plane3, -90, 0, 0);
    rotateObject(plane4, 0, 90, 0);
    rotateObject(plane5, 0, -90, 0);
    rotateObject(plane6, 0, -180, 0);
    scene.add(plane);
    scene.add(plane2);
    scene.add(plane3);
    scene.add(plane4);
    scene.add(plane5);
    scene.add(plane6);
    mesh.position.set(0,0,0);
    //scene.add(mesh);
    
    //СТОРОНА 1
    setPoint(0,0,0);
    drawLine(0,150,0);
    drawLine(150,150,0);
    drawLine(150,0,0);
    drawLine(0,0,0);
    setPoint(50,50,0);
    drawLine(100,50,0);
    drawLine(100,100,0);
    drawLine(50,100,0);
    drawLine(50,50,0);
    setPoint(0,150,0);
    drawLine(75,215,0);
    drawLine(150,150,0);
    
    //СТОРОНА 2
    setPoint(0,0,150);
    drawLine(0,150,150);
    drawLine(150,150,150);
    drawLine(150,0,150);
    drawLine(0,0,150);
    setPoint(50,50,150);
    drawLine(100,50,150);
    drawLine(100,100,150);
    drawLine(50,100,150);
    drawLine(50,50,150);
    setPoint(0,150,150);
    drawLine(75,215,150);
    drawLine(150,150,150);
    
    
    //СОЕДИНЯЮ ЛИНИЯМИ
    setPoint(0,0,0);
    drawLine(0,0,150);
    setPoint(0,150,0);
    drawLine(0,150,150);
    setPoint(75,215,0);
    drawLine(75,215,150);
    setPoint(150,0,0);
    drawLine(150,0,150);
    setPoint(150,150,0);
    drawLine(150,150,150);
    
    //ОКНО 3
    setPoint(0, 50, 50);
    drawLine(0, 50,100);
    drawLine(0, 100,100);
    drawLine(0, 100,50);
    drawLine(0, 50,50);
    
    //ДВЕРЬ
    setPoint(150, 0, 40);
    drawLine(150, 120,40);
    drawLine(150, 120,110);
    drawLine(150, 00,110);
    
    //ТРУБА
    setPoint(130, 165, 20);
    drawLine(130, 190,20);
    drawLine(110, 190,20);
    drawLine(110, 185,20);
    setPoint(110, 190,20);
    drawLine(110, 190,40);
    drawLine(110, 185,40);
    setPoint(110, 190,40);
    drawLine(130, 190,40);
    drawLine(130, 190,20);
    setPoint(130, 190,40);
    drawLine(130, 165,40);
    drawLine(130, 165,20);
    drawLine(110, 185,20);
    setPoint(130, 165,40);
    drawLine(110, 185,40);
    
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
    if (vis == true)
        {
            scene.remove(plane);
            scene.remove(plane2);
            scene.remove(plane3);
            scene.remove(plane4);
            scene.remove(plane5);
            scene.remove(plane6);
        }
    else
        {
            scene.add(plane);
            scene.add(plane2);
            scene.add(plane3);
            scene.add(plane4);
            scene.add(plane5);
            scene.add(plane6);
        }
    vis = !vis;
    renderer.render(scene, camera);
}