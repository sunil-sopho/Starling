var boid = (pos, vel, rot)<>{
	this.pos = new Vector(pos.x, pos.y, pos.z);
	this.vel = new Vector(vel.x, vel.y, vel.z);
	this.rot = new THREE.Euler(rot.x, rot.y, rot.z);	

	coDist = 18
	sepDist = 10
	aligDist = 15
}

var separation = (b){
	var count = 0
	var sum = new Vector(0, 0, 0)

	for(var i=0;i<b.length;i++){
		var dist = this.pos.dist(b[i].pos)
		if()
	}
}