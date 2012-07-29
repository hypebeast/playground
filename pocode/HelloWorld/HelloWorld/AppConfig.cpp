/////////////////////////////////////////
//
// pocode application configuration
//
/////////////////////////////////////////


#include "poApplication.h"
#include "HelloWorldApp.h"

poObject *createObjectForID(uint uid) {
	return new HelloWorldApp();
}

void setupApplication() {
	applicationCreateWindow(0, WINDOW_TYPE_NORMAL, "HelloWorld", 100, 100, 1024, 768);
}

void cleanupApplication() {
}