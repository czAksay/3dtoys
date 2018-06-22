var scene;
var camera;
var renderer;
var canvas;
var markMesh;
var samolet;

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
    var glassColor = new THREE.LineBasicMaterial({ color : 0xc1fffb, transparent: true, opacity: 0.5 });
    var glassMesh = new THREE.Mesh(glassGeo, glassColor);
    glassMesh.position.set(0, 0, 250);
    scene.add(glassMesh);
    
    //СОЗДАТЬ МАРКЕР
    var markMat = new THREE.LineBasicMaterial({ color : 0x000000});
    markMesh = new THREE.Mesh(new THREE.CubeGeometry(30, 11, 1), markMat);
    markMesh.position.set(0,-10,280);
    scene.add(markMesh);
    
    //ЕГО ЛИЦЦЦЦООО
    //var imgFace = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture('src/maks.png'), transparent: true});
    //planeFace = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), imgFace);
    //rotateObject(planeFace, 0, -180, 0);
    //planeFace.position.set(0,10,275);
    //scene.add(planeFace);
    
    
    
    
    
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
    heartShape.moveTo( 25, 25);
    heartShape.bezierCurveTo( 100, 110, 10, 200, 0, 0 );
    
    var mehImg = new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture('src/meh.jpg')});
    var extSet = { amount: 2, bevelEnabled: true, bevelSegments: 10, steps: 0, bevelSize: 0, bevelThickness: 2 };
    var geometry = new THREE.ExtrudeGeometry( heartShape, extSet );
    var uho1 = new THREE.Mesh( geometry, mehImg );
    var uho2 = new THREE.Mesh( geometry, mehImg );
    uho1.position.set(25, 105,90);
    uho2.position.set(-25, 105,90);
    rotateObject(uho2, 0, 180, 0);
    scene.add(uho1);
    scene.add(uho2);
    
    var group2 = new THREE.Group();
    group2.add(sphereBody);
    group2.add(sphereLeg1);
                group2.add(sphereLeg2);
                group2.add(faceMesh);
                group2.add(sphereRuka1);
                group2.add(sphereRuka2);
                group2.add(uho1);
                group2.add(uho2);
    group2.scale.set(0.1,0.1,0.1);
    group2.position.set(0,-10,275);
    rotateObject(group2, 0,180,0);
    scene.add(group2);
    
    
    
    samolet = new THREE.Group();
    samolet.add(hvostC);
    samolet.add(bodyC);
    samolet.add(flyP);
    samolet.add(hv1);
    samolet.add(hv2);
    samolet.add(hv3);
    samolet.add(kabMesh);
    samolet.add(glassMesh);
    samolet.add(markMesh);
    samolet.add(group2);
    scene.add(samolet)
    
    
    
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
    if(event.keyCode == 99)
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
    if(event.keyCode == 69)
    {
        if (view == 1)
            {
                rotateObject(samolet, 0,8,0);
            }
    }
    if(event.which == 81 || event.keyCode == 81)
    {
        if (view == 1)
            {
                rotateObject(samolet, 0,-8,0);
            }
    }
    if(event.which == 82 || event.keyCode == 82)
    {
        if (view == 1)
            {
                rotateObject(samolet, 0,0,5);
            }
    }
    if(event.which == 84 || event.keyCode == 84)
    {
        if (view == 1)
            {
                rotateObject(samolet, 0,0, -5);
            }
    }
    if(event.which == 87 || event.keyCode == 87)
    {
        if (view == 1)
            {
                rotateObject(samolet, 3,0, 0);
            }
    }
    if(event.which == 89 || event.keyCode == 89)
    {
        if (view == 1)
            {
                rotateObject(samolet, -3,0, 0);
            }
    }
    renderer.render(scene, camera);
}