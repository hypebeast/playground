/*	Created by Sebastian Ruml on 1/30/12.
 *	Copyright 2012 __MyCompanyName__. All rights reserved.
 */

#include "HelloWorldApp.h"
#include "poApplication.h"
#include "poCamera.h"
#include "poShapeBasics2D.h"


// APP CONSTRUCTOR. Create all objects here.
HelloWorldApp::HelloWorldApp() {
	addModifier(new poCamera2D(poColor::black));
    
    poOvalShape* circle = new poOvalShape(50, 50, 50);
    circle->position.set(getWindowWidth()/2, getWindowHeight()/2, 0);
    circle->fillColor = poColor::magenta;
    
    addChild(circle);
}

// APP DESTRUCTOR. Delete all objects here.
HelloWorldApp::~HelloWorldApp() {
}

// UPDATE. Called once per frame. Animate objects here.
void HelloWorldApp::update() {
	
}

// DRAW. Called once per frame. Draw objects here.
void HelloWorldApp::draw() {
	
}

// EVENT HANDLER. Called when events happen. Respond to events here.
void HelloWorldApp::eventHandler(poEvent *event) {
	
}

// MESSAGE HANDLER. Called from within the app. Use for message passing.
void HelloWorldApp::messageHandler(const std::string &msg, const poDictionary& dict) {
	
}
