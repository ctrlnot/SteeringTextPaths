function Vehicle(x, y, r, g, b) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.maxspeed = 10;
    this.maxforce = 1;
    this.colR = r;
    this.colG = g;
    this.colB = b;
    this.r = 8;
}

Vehicle.prototype.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
}

Vehicle.prototype.show = function() {
    stroke(this.colR, this.colG, this.colB);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
}

Vehicle.prototype.behaviors = function() {
    var arrive = this.arrive(this.target);
    var mouse = createVector(mouseX, mouseY);
    var flee = this.flee(mouse);

    arrive.mult(1);
    flee.mult(5);

    this.applyForce(arrive);
    this.applyForce(flee);
}

Vehicle.prototype.applyForce = function(f) {
    this.acc.add(f);
}

Vehicle.prototype.arrive = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var spd = this.maxspeed;
    if (d < 100) {
        spd = map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(spd);

    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
}

Vehicle.prototype.flee = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < 75) {
        desired.setMag(this.maxspeed);
        desired.mult(-1);

        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);
        return steer;
    } else {
        return createVector();
    }
}