function boidMouseUp() {
	boidCount = (document.querySelector('#BoidCount').value);
	document.querySelector('#BoidCountLabel').value = boidCount;
	
	if(boidCount > boids.length) {
		var count = boidCount - boids.length;
		for(var i = 0; i != count; i++) {
			addBoid();
		}
	} else if(boidCount < boids.length) {
		var count = boids.length - boidCount;
		for(var i = 0; i != count; i++) {
			removeBoid();
		}
	}
}

function sharkMouseUp() {
	sharkCount = (document.querySelector('#SharkCount').value);
	document.querySelector('#SharkCountLabel').value = sharkCount;
	
	if(sharkCount > sharks.length) {
		var count = sharkCount - sharks.length;
		for(var i = 0; i != count; i++) {
			addShark();
		}
	} else if(sharkCount < sharks.length) {
		var count = sharks.length - sharkCount;
		for(var i = 0; i != count; i++) {
			removeShark();
		}
	}
}

function disableOrbit() {
	controls.enabled = false;
}

function enableOrbit() {
	controls.enabled = true;
}


function fixLayout() {
	var div = document.getElementById('menu2');
	var slider = document.getElementById('SepForce');
	var width = slider.offsetWidth + 20;
	div.style.left = '' + width + 'px';
}

function setupOrbitControls() {
	controls = new THREE.OrbitControls(camera);
	controls.damping = 0.2;
    controls.addEventListener('change', render);
}

function setupFirstPersonControls() {
	controls = new THREE.FirstPersonControls(camera);
    controls.lookSpeed = 0.3;
    controls.movementSpeed = 50;
    controls.noFly = true;
    controls.lookVertical = true;
    controls.constrainVertical = true;
    controls.verticalMin = .1;
    controls.verticalMax = 5;
    controls.lon = -150;
    controls.lat = 120;
}

function addContext() {
	var cubeGeometry = new THREE.SphereGeometry(500, 16, 16);
	var dashMaterial = new THREE.LineDashedMaterial( { color: 0x000000, dashSize: 2, gapSize: 3 } );
	
	var cube = new THREE.Line(geo2line(cubeGeometry), dashMaterial, THREE.LinePieces);
	cube.position.set(0, 0, 0);
	scene.add(cube);
}

function geo2line( geo ) // credit to WestLangley!
{
    var geometry = new THREE.Geometry();
    var vertices = geometry.vertices;
	
	for ( i = 0; i < geo.faces.length; i++ ) 
	{
        var face = geo.faces[ i ];
        if ( face instanceof THREE.Face3 ) 
		{
            var a = geo.vertices[ face.a ].clone();
			var b = geo.vertices[ face.b ].clone();
			var c = geo.vertices[ face.c ].clone();
            vertices.push( a,b, b,c, c,a );
        } 
		else if ( face instanceof THREE.Face4 ) 
		{
			var a = geo.vertices[ face.a ].clone();
			var b = geo.vertices[ face.b ].clone();
			var c = geo.vertices[ face.c ].clone();
			var d = geo.vertices[ face.d ].clone();
            vertices.push( a,b, b,c, c,d, d,a );
        }
    }
    geometry.computeLineDistances();
    return geometry;
}

function loadBoids1(amount) {
	boids = [];
	sharks = [];
	bgroup = new THREE.Group();
	sgroup = new THREE.Group();
	loader = new THREE.JSONLoader();
	loader2 = new THREE.JSONLoader();
	
	loader.load('../models/shark.json', function (geometry) {
		THREE.GeometryUtils.center(geometry);
		sharkGeometry = geometry;
		sharkMaterial = new THREE.MeshLambertMaterial({color: 0x4444cc});
		
		for(var i = 0; i != sharkCount; i++) {
			var posx = Math.random() * 300 - 150;
			var posy = Math.random() * 300 - 150;
			var posz = Math.random() * 300 - 150;
			
			var rotx = 0;
			var roty = 0;
			var rotz = 0;
			
			var pos = new Vector(posx, posy, posz);
			var rot = new Vector(rotx, roty, rotz);
			var vel = new Vector(Math.random() * 10 - .5,
							     Math.random() * 10 - .5,
							     Math.random() * 10 - .5);
							     
			var boid = new Boid(pos, rot, vel, true);
			var	mesh = new THREE.Mesh(sharkGeometry, sharkMaterial);

			mesh.position.x = pos.x;
			mesh.position.y = pos.y;
			mesh.position.z = pos.z;
			
			mesh.rotation.x = rot.x;
			mesh.rotation.y = rot.y;
			mesh.rotation.z = rot.z;

			sharks.push(boid);
			sgroup.add(mesh);
		}
		loadBoids2();
	});
}

function loadBoids2() {
	loader2.load('../models/vector.json', function (geometry) {
		THREE.GeometryUtils.center(geometry);
		boidGeometry = geometry;
		boidMaterial = new THREE.MeshLambertMaterial({color: 0xcc4444});
		
		for(var i = 0; i != boidCount; i++) {
			var posx = Math.random() * 300 - 150;
			var posy = Math.random() * 300 - 150;
			var posz = Math.random() * 300 - 150;
			
			var rotx = 0;
			var roty = 0;
			var rotz = 0;
			
			var pos = new Vector(posx, posy, posz);
			var rot = new Vector(rotx, roty, rotz);
			var vel = new Vector(Math.random() * 10 - .5,
							     Math.random() * 10 - .5,
							     Math.random() * 10 - .5);
							     

			var	boid = new Boid(pos, rot, vel, false);
			var	mesh = new THREE.Mesh(geometry, boidMaterial);
			
			mesh.position.x = pos.x;
			mesh.position.y = pos.y;
			mesh.position.z = pos.z;
			
			mesh.rotation.x = rot.x;
			mesh.rotation.y = rot.y;
			mesh.rotation.z = rot.z;

			boids.push(boid);
			bgroup.add(mesh);
		}
		goahead = true;
		loadBoids3();
	});
}

function loadBoids3() {
	scene.add(sgroup);
	scene.add(bgroup);
}

function addBoid() {
	var mesh = new THREE.Mesh(boidGeometry, boidMaterial);
	var posx = Math.random() * 100 - 50;
	var posy = Math.random() * 100 - 50;
	var posz = Math.random() * 100 - 50;
	
	var rotx = 0;
	var roty = 0;
	var rotz = 0;
	
	var pos = new Vector(posx, posy, posz);
	var rot = new Vector(rotx, roty, rotz);
	var vel = new Vector(Math.random() * 10 - .5,
					     Math.random() * 10 - .5,
					     Math.random() * 10 - .5);
	
	mesh.position.x = pos.x;
	mesh.position.y = pos.y;
	mesh.position.z = pos.z;
	
	mesh.rotation.x = rot.x;
	mesh.rotation.y = rot.y;
	mesh.rotation.z = rot.z;
	
	var boid = new Boid(pos, rot, vel);
	
	boids.push(boid);
	bgroup.add(mesh);
}

function addShark() {
	var mesh = new THREE.Mesh(sharkGeometry, sharkMaterial);
	var posx = Math.random() * 100 - 50;
	var posy = Math.random() * 100 - 50;
	var posz = Math.random() * 100 - 50;
	
	var rotx = 0;
	var roty = 0;
	var rotz = 0;
	
	var pos = new Vector(posx, posy, posz);
	var rot = new Vector(rotx, roty, rotz);
	var vel = new Vector(Math.random() * 10 - .5,
					     Math.random() * 10 - .5,
					     Math.random() * 10 - .5);
	
	mesh.position.x = pos.x;
	mesh.position.y = pos.y;
	mesh.position.z = pos.z;
	
	mesh.rotation.x = rot.x;
	mesh.rotation.y = rot.y;
	mesh.rotation.z = rot.z;
	
	var boid = new Boid(pos, rot, vel);
	
	sharks.push(boid);
	sgroup.add(mesh);
}

function removeShark() {
	sharks.pop();
	sgroup.children.pop();
}

function removeBoid() {
	boids.pop();
	bgroup.children.pop();
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
	var delta = clock.getDelta();
	
	renderer.render(scene, camera);
	stats.update();

	buttonUpdate();

	if(goahead) {
		boidsUpdate();
		
		if(keyboard.pressed("space")) {
			var center = new THREE.Vector3(0, 0, 0);
			for(var i = 0; i != bgroup.children.length; i++) {
				center.add(bgroup.children[i].position);
			}
			center.divideScalar(bgroup.children.length);
			camera.lookAt(center);
		    controls.target = center;
		}
	}
	
	if(trackingShark) {
		var relativeCameraOffset = new THREE.Vector3(0, -20, 0);
		var cameraOffset = relativeCameraOffset.applyMatrix4(sgroup.children[0].matrixWorld);
		camera.position.x = cameraOffset.x;
		camera.position.y = cameraOffset.y;
		camera.position.z = cameraOffset.z;
		camera.lookAt(sgroup.children[0].position);
	}
	
	if(trackingBoid) {
		var relativeCameraOffset = new THREE.Vector3(0, -20, 0);
		var cameraOffset = relativeCameraOffset.applyMatrix4(bgroup.children[0].matrixWorld);
		camera.position.x = cameraOffset.x;
		camera.position.y = cameraOffset.y;
		camera.position.z = cameraOffset.z;
		camera.lookAt(bgroup.children[0].position);
	}
	
	
}

function buttonUpdate() {
	sepFac = (document.querySelector('#SepForce').value) / 100;
	if(sepFac == 0) sepFac = 0.01;
	document.querySelector('#sfout').value = sepFac;
	sharkSepFac = sepFac * 5;
	
	cohFac = (document.querySelector('#CohForce').value) / 100;
	if(cohFac == 0) cohFac = 0.01;
	document.querySelector('#cfout').value = cohFac;
	
	aliFac = (document.querySelector('#AliForce').value) / 100;
	if(aliFac == 0) aliFac = 0.01;
	document.querySelector('#afout').value = aliFac;
	
	tarFac = (document.querySelector('#CenForce').value) / 100;
	if(tarFac == 0) tarFac = 0.001;
	document.querySelector('#tfout').value = tarFac;


	
	sepDist = (document.querySelector('#SepDist').value) / 1;
	if(sepFac == 0) SepDist = 0.1;
	document.querySelector('#sdout').value = sepDist;
	sharkSepDist = sepDist * 2;
	
	cohDist = (document.querySelector('#CohDist').value) / 1;
	if(cohFac == 0) cohDist = 0.1;
	document.querySelector('#cdout').value = cohDist;
	
	aliDist = (document.querySelector('#AliDist').value) / 1;
	if(aliDist== 0) aliDist = 0.1;
	document.querySelector('#adout').value = aliDist;
	
	
	
	maxSpeed = (document.querySelector('#MaxSpeed').value) / 100;
	if(maxSpeed == 0) maxSpeed = 0.01;
	sharkMaxSpeed = maxSpeed * 3;
	document.querySelector('#speedout').value = maxSpeed;
	
	maxForce = (document.querySelector('#Acceleration').value) / 1000;
	if(maxForce == 0) maxForce = 0.001;
	sharkMaxForce = maxForce * 3;
	document.querySelector('#accelout').value = maxForce;
}

function boidsUpdate() {	
	for(var i = 0; i != boidCount; i++) {
		if(i < boids.length) {
			boids[i].update(boids, target, sharks);
			
			bgroup.children[i].position.x = boids[i].pos.x;
			bgroup.children[i].position.y = boids[i].pos.y;
			bgroup.children[i].position.z = boids[i].pos.z;
			
			bgroup.children[i].rotation.x = boids[i].rot.x;
			bgroup.children[i].rotation.y = boids[i].rot.y;
			bgroup.children[i].rotation.z = boids[i].rot.z;
		}
	}
	
	for(var i = 0; i != sharkCount; i++) {
		if(i < sharks.length) {
			sharks[i].update(boids, target, sharks);
			
			sgroup.children[i].position.x = sharks[i].pos.x;
			sgroup.children[i].position.y = sharks[i].pos.y;
			sgroup.children[i].position.z = sharks[i].pos.z;
			
			sgroup.children[i].rotation.x = sharks[i].rot.x;
			sgroup.children[i].rotation.y = sharks[i].rot.y;
			sgroup.children[i].rotation.z = sharks[i].rot.z;
		}
	}
}