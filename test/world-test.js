const World = require('../lib/world')
const assert = require('chai').assert

describe('World', () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  let world = new World(canvas);


  it('should be a function', () =>{
    assert.isFunction(World)
  })

  it('should have a width', () => {
    assert.equal(world.width, 600)
  })

  it('should have a height', () => {
    assert.equal(world.height, 500)
  })

  it('should have 3 lives by default', function() {
    assert.equal(world.lives, 3)
  })

  it('should have a score of 0 by default', function() {
    assert.equal(world.score, 0)
  })

  it('should have a level of 1 by default', function() {
    assert.equal(world.level, 1)
  })

  it('should have an array of 40 blocks', () => {
    assert.equal(world.blocksArray.length, 40)
  })

  it('startGame changes the balls velocity from 0 to 4 on click', () => {
    assert.equal(world.ball.vx, 0);
    assert.equal(world.ball.vy, 0);
    canvas.onClick = () => {
      assert.equal(world.ball.vx, 4)
      assert.equal(world.ball.vy, -4)
    }

  })

  it('wallCollision doesnt change velocity unless there is a collision', () =>{

    assert.equal(world.ball.vx, 0);
    world.wallCollision();
    assert.equal(world.ball.vx, 0);
  })

  it('wallCollision should change x velocity when there is a left wall collision', () => {
    world.ball.vx = -4
    world.ball.x = -1
    world.wallCollision();
    assert.equal(world.ball.vx, 4 )
  })

  it('wallCollision should change x velocity when there is a right wall collision', () => {
    world.ball.vx = 4
    world.ball.x = 601
    world.wallCollision();
    assert.equal(world.ball.vx, -4 )
  })

  it('should change Y velocity when hitting the top wall', () =>{
    world.ball.vy = -4
    world.ball.y = -1
    world.ceilingCollision();
    assert.equal(world.ball.vy, 4)
  })

  it('should increase score when the ball hits a block', () =>{
    let world = new World(canvas);

    assert.equal(world.score, 0)
    world.ball.y = 105
    world.ball.x = 17
    world.blockCollide()
    assert.equal(world.score, 1)
  })

  it('should decrement one life when the ball hits the bottom and lives are > 1', () => {
    world.lives = 3
    assert.equal(world.lives, 3)
    world.ball.y = 520
    world.bottomCollision(ctx)
    assert.equal(world.lives, 2)

  })

})
