function SceneFour () {


	this.clearColor = 0e1416;
	// CAMERA
	var persp = 400
	var distance = 650
	var counter
	var gravityspeed
	var blink = 0
	this.timer = false
	cameraOne = this.camera
	this.camera = new THREE.PerspectiveCamera( 15, window.innerWidth / window.innerHeight, 0.1, 10000 );
	this.camera.position.x = 0;
	this.camera.position.y = persp;
	this.camera.position.z = distance;
	this.camera.lookAt( new THREE.Vector3())



	// Setup scene
	this.scene = new THREE.Scene();
	sceneNumberFour = this.scene
	// LIGHTS
	let lights = {
		 ambient: new THREE.AmbientLight( 0xffffff )
		,directional: new THREE.DirectionalLight( 0xfffff2, 0 )
		,point: new THREE.PointLight( 0xff8755, 1 )
	}
	lights.point.position.set( 135, 200, -200)
	lights.point.castShadow = false
	lights.point.shadowDarkness = 1;
	lights.point.shadowCameraVisible = true;
	//this.scene.add( lights.point );
	this.scene.add( lights.ambient );

	//OBJECT LOADER	
	var dae;
	var dae_geometry;
	var dae_material;
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( 'scenes/scene4/model/night.dae', function ( collada ) {
		dae = collada.scene;
		for (var i = 0; i < dae.children.length; i++) {
			if (dae.children[i].name != "Camera" && dae.children[i].name != "Light") {
				for (var j = 0; j < dae.children[i].children.length; j++) {
					var mat = dae.children[i].children[j].material;
					mat.transparent = true;
					//mat.depthWrite = false;
				}
			}
			
		}
		dae.scale.x = dae.scale.y = dae.scale.z = .3;
		dae.position.y = -45;
		dae.updateMatrix();
		sceneNumberFour.add( dae );
	
	} );


	renderTargetParameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBuffer: false };
	this.fbo = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, renderTargetParameters );

    
	this.render = function( delta, rtt ) {


		this.camera.position.x += ( (mouseX)/20 - this.camera.position.x ) * .1;
		this.camera.position.y += ( (mouseY)/20 - this.camera.position.y + persp ) * .1;
		this.camera.lookAt( new THREE.Vector3())



		renderer.setClearColor( this.clearColor );

		if ( rtt )
			renderer.render( this.scene, this.camera, this.fbo, true );
		else
			renderer.render( this.scene, this.camera );

	};

}