/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = 10000;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "1052818dd4dd38646cac"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest().then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate).then(function(result) {
/******/ 				deferred.resolve(result);
/******/ 			}, function(err) {
/******/ 				deferred.reject(err);
/******/ 			});
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return Promise.resolve(outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(11)(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

eval("var Vue // late bind\nvar version\nvar map = window.__VUE_HOT_MAP__ = Object.create(null)\nvar installed = false\nvar isBrowserify = false\nvar initHookName = 'beforeCreate'\n\nexports.install = function (vue, browserify) {\n  if (installed) return\n  installed = true\n\n  Vue = vue.__esModule ? vue.default : vue\n  version = Vue.version.split('.').map(Number)\n  isBrowserify = browserify\n\n  // compat with < 2.0.0-alpha.7\n  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {\n    initHookName = 'init'\n  }\n\n  exports.compatible = version[0] >= 2\n  if (!exports.compatible) {\n    console.warn(\n      '[HMR] You are using a version of vue-hot-reload-api that is ' +\n      'only compatible with Vue.js core ^2.0.0.'\n    )\n    return\n  }\n}\n\n/**\n * Create a record for a hot module, which keeps track of its constructor\n * and instances\n *\n * @param {String} id\n * @param {Object} options\n */\n\nexports.createRecord = function (id, options) {\n  var Ctor = null\n  if (typeof options === 'function') {\n    Ctor = options\n    options = Ctor.options\n  }\n  makeOptionsHot(id, options)\n  map[id] = {\n    Ctor: Vue.extend(options),\n    instances: []\n  }\n}\n\n/**\n * Make a Component options object hot.\n *\n * @param {String} id\n * @param {Object} options\n */\n\nfunction makeOptionsHot (id, options) {\n  injectHook(options, initHookName, function () {\n    map[id].instances.push(this)\n  })\n  injectHook(options, 'beforeDestroy', function () {\n    var instances = map[id].instances\n    instances.splice(instances.indexOf(this), 1)\n  })\n}\n\n/**\n * Inject a hook to a hot reloadable component so that\n * we can keep track of it.\n *\n * @param {Object} options\n * @param {String} name\n * @param {Function} hook\n */\n\nfunction injectHook (options, name, hook) {\n  var existing = options[name]\n  options[name] = existing\n    ? Array.isArray(existing)\n      ? existing.concat(hook)\n      : [existing, hook]\n    : [hook]\n}\n\nfunction tryWrap (fn) {\n  return function (id, arg) {\n    try { fn(id, arg) } catch (e) {\n      console.error(e)\n      console.warn('Something went wrong during Vue component hot-reload. Full reload required.')\n    }\n  }\n}\n\nexports.rerender = tryWrap(function (id, options) {\n  var record = map[id]\n  if (!options) {\n    record.instances.slice().forEach(function (instance) {\n      instance.$forceUpdate()\n    })\n    return\n  }\n  if (typeof options === 'function') {\n    options = options.options\n  }\n  record.Ctor.options.render = options.render\n  record.Ctor.options.staticRenderFns = options.staticRenderFns\n  record.instances.slice().forEach(function (instance) {\n    instance.$options.render = options.render\n    instance.$options.staticRenderFns = options.staticRenderFns\n    instance._staticTrees = [] // reset static trees\n    instance.$forceUpdate()\n  })\n})\n\nexports.reload = tryWrap(function (id, options) {\n  var record = map[id]\n  if (options) {\n    if (typeof options === 'function') {\n      options = options.options\n    }\n    makeOptionsHot(id, options)\n    if (version[1] < 2) {\n      // preserve pre 2.2 behavior for global mixin handling\n      record.Ctor.extendOptions = options\n    }\n    var newCtor = record.Ctor.super.extend(options)\n    record.Ctor.options = newCtor.options\n    record.Ctor.cid = newCtor.cid\n    record.Ctor.prototype = newCtor.prototype\n    if (newCtor.release) {\n      // temporary global mixin strategy used in < 2.0.0-alpha.6\n      newCtor.release()\n    }\n  }\n  record.instances.slice().forEach(function (instance) {\n    if (instance.$vnode && instance.$vnode.context) {\n      instance.$vnode.context.$forceUpdate()\n    } else {\n      console.warn('Root or manually mounted instance modified. Full reload required.')\n    }\n  })\n})\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL34vdnVlLWhvdC1yZWxvYWQtYXBpL2luZGV4LmpzPzJjNDUiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIFZ1ZSAvLyBsYXRlIGJpbmRcbnZhciB2ZXJzaW9uXG52YXIgbWFwID0gd2luZG93Ll9fVlVFX0hPVF9NQVBfXyA9IE9iamVjdC5jcmVhdGUobnVsbClcbnZhciBpbnN0YWxsZWQgPSBmYWxzZVxudmFyIGlzQnJvd3NlcmlmeSA9IGZhbHNlXG52YXIgaW5pdEhvb2tOYW1lID0gJ2JlZm9yZUNyZWF0ZSdcblxuZXhwb3J0cy5pbnN0YWxsID0gZnVuY3Rpb24gKHZ1ZSwgYnJvd3NlcmlmeSkge1xuICBpZiAoaW5zdGFsbGVkKSByZXR1cm5cbiAgaW5zdGFsbGVkID0gdHJ1ZVxuXG4gIFZ1ZSA9IHZ1ZS5fX2VzTW9kdWxlID8gdnVlLmRlZmF1bHQgOiB2dWVcbiAgdmVyc2lvbiA9IFZ1ZS52ZXJzaW9uLnNwbGl0KCcuJykubWFwKE51bWJlcilcbiAgaXNCcm93c2VyaWZ5ID0gYnJvd3NlcmlmeVxuXG4gIC8vIGNvbXBhdCB3aXRoIDwgMi4wLjAtYWxwaGEuN1xuICBpZiAoVnVlLmNvbmZpZy5fbGlmZWN5Y2xlSG9va3MuaW5kZXhPZignaW5pdCcpID4gLTEpIHtcbiAgICBpbml0SG9va05hbWUgPSAnaW5pdCdcbiAgfVxuXG4gIGV4cG9ydHMuY29tcGF0aWJsZSA9IHZlcnNpb25bMF0gPj0gMlxuICBpZiAoIWV4cG9ydHMuY29tcGF0aWJsZSkge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgICdbSE1SXSBZb3UgYXJlIHVzaW5nIGEgdmVyc2lvbiBvZiB2dWUtaG90LXJlbG9hZC1hcGkgdGhhdCBpcyAnICtcbiAgICAgICdvbmx5IGNvbXBhdGlibGUgd2l0aCBWdWUuanMgY29yZSBeMi4wLjAuJ1xuICAgIClcbiAgICByZXR1cm5cbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIHJlY29yZCBmb3IgYSBob3QgbW9kdWxlLCB3aGljaCBrZWVwcyB0cmFjayBvZiBpdHMgY29uc3RydWN0b3JcbiAqIGFuZCBpbnN0YW5jZXNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cblxuZXhwb3J0cy5jcmVhdGVSZWNvcmQgPSBmdW5jdGlvbiAoaWQsIG9wdGlvbnMpIHtcbiAgdmFyIEN0b3IgPSBudWxsXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIEN0b3IgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IEN0b3Iub3B0aW9uc1xuICB9XG4gIG1ha2VPcHRpb25zSG90KGlkLCBvcHRpb25zKVxuICBtYXBbaWRdID0ge1xuICAgIEN0b3I6IFZ1ZS5leHRlbmQob3B0aW9ucyksXG4gICAgaW5zdGFuY2VzOiBbXVxuICB9XG59XG5cbi8qKlxuICogTWFrZSBhIENvbXBvbmVudCBvcHRpb25zIG9iamVjdCBob3QuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5cbmZ1bmN0aW9uIG1ha2VPcHRpb25zSG90IChpZCwgb3B0aW9ucykge1xuICBpbmplY3RIb29rKG9wdGlvbnMsIGluaXRIb29rTmFtZSwgZnVuY3Rpb24gKCkge1xuICAgIG1hcFtpZF0uaW5zdGFuY2VzLnB1c2godGhpcylcbiAgfSlcbiAgaW5qZWN0SG9vayhvcHRpb25zLCAnYmVmb3JlRGVzdHJveScsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaW5zdGFuY2VzID0gbWFwW2lkXS5pbnN0YW5jZXNcbiAgICBpbnN0YW5jZXMuc3BsaWNlKGluc3RhbmNlcy5pbmRleE9mKHRoaXMpLCAxKVxuICB9KVxufVxuXG4vKipcbiAqIEluamVjdCBhIGhvb2sgdG8gYSBob3QgcmVsb2FkYWJsZSBjb21wb25lbnQgc28gdGhhdFxuICogd2UgY2FuIGtlZXAgdHJhY2sgb2YgaXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBob29rXG4gKi9cblxuZnVuY3Rpb24gaW5qZWN0SG9vayAob3B0aW9ucywgbmFtZSwgaG9vaykge1xuICB2YXIgZXhpc3RpbmcgPSBvcHRpb25zW25hbWVdXG4gIG9wdGlvbnNbbmFtZV0gPSBleGlzdGluZ1xuICAgID8gQXJyYXkuaXNBcnJheShleGlzdGluZylcbiAgICAgID8gZXhpc3RpbmcuY29uY2F0KGhvb2spXG4gICAgICA6IFtleGlzdGluZywgaG9va11cbiAgICA6IFtob29rXVxufVxuXG5mdW5jdGlvbiB0cnlXcmFwIChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKGlkLCBhcmcpIHtcbiAgICB0cnkgeyBmbihpZCwgYXJnKSB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICBjb25zb2xlLndhcm4oJ1NvbWV0aGluZyB3ZW50IHdyb25nIGR1cmluZyBWdWUgY29tcG9uZW50IGhvdC1yZWxvYWQuIEZ1bGwgcmVsb2FkIHJlcXVpcmVkLicpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydHMucmVyZW5kZXIgPSB0cnlXcmFwKGZ1bmN0aW9uIChpZCwgb3B0aW9ucykge1xuICB2YXIgcmVjb3JkID0gbWFwW2lkXVxuICBpZiAoIW9wdGlvbnMpIHtcbiAgICByZWNvcmQuaW5zdGFuY2VzLnNsaWNlKCkuZm9yRWFjaChmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgIGluc3RhbmNlLiRmb3JjZVVwZGF0ZSgpXG4gICAgfSlcbiAgICByZXR1cm5cbiAgfVxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucy5vcHRpb25zXG4gIH1cbiAgcmVjb3JkLkN0b3Iub3B0aW9ucy5yZW5kZXIgPSBvcHRpb25zLnJlbmRlclxuICByZWNvcmQuQ3Rvci5vcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zXG4gIHJlY29yZC5pbnN0YW5jZXMuc2xpY2UoKS5mb3JFYWNoKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgIGluc3RhbmNlLiRvcHRpb25zLnJlbmRlciA9IG9wdGlvbnMucmVuZGVyXG4gICAgaW5zdGFuY2UuJG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnNcbiAgICBpbnN0YW5jZS5fc3RhdGljVHJlZXMgPSBbXSAvLyByZXNldCBzdGF0aWMgdHJlZXNcbiAgICBpbnN0YW5jZS4kZm9yY2VVcGRhdGUoKVxuICB9KVxufSlcblxuZXhwb3J0cy5yZWxvYWQgPSB0cnlXcmFwKGZ1bmN0aW9uIChpZCwgb3B0aW9ucykge1xuICB2YXIgcmVjb3JkID0gbWFwW2lkXVxuICBpZiAob3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMub3B0aW9uc1xuICAgIH1cbiAgICBtYWtlT3B0aW9uc0hvdChpZCwgb3B0aW9ucylcbiAgICBpZiAodmVyc2lvblsxXSA8IDIpIHtcbiAgICAgIC8vIHByZXNlcnZlIHByZSAyLjIgYmVoYXZpb3IgZm9yIGdsb2JhbCBtaXhpbiBoYW5kbGluZ1xuICAgICAgcmVjb3JkLkN0b3IuZXh0ZW5kT3B0aW9ucyA9IG9wdGlvbnNcbiAgICB9XG4gICAgdmFyIG5ld0N0b3IgPSByZWNvcmQuQ3Rvci5zdXBlci5leHRlbmQob3B0aW9ucylcbiAgICByZWNvcmQuQ3Rvci5vcHRpb25zID0gbmV3Q3Rvci5vcHRpb25zXG4gICAgcmVjb3JkLkN0b3IuY2lkID0gbmV3Q3Rvci5jaWRcbiAgICByZWNvcmQuQ3Rvci5wcm90b3R5cGUgPSBuZXdDdG9yLnByb3RvdHlwZVxuICAgIGlmIChuZXdDdG9yLnJlbGVhc2UpIHtcbiAgICAgIC8vIHRlbXBvcmFyeSBnbG9iYWwgbWl4aW4gc3RyYXRlZ3kgdXNlZCBpbiA8IDIuMC4wLWFscGhhLjZcbiAgICAgIG5ld0N0b3IucmVsZWFzZSgpXG4gICAgfVxuICB9XG4gIHJlY29yZC5pbnN0YW5jZXMuc2xpY2UoKS5mb3JFYWNoKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgIGlmIChpbnN0YW5jZS4kdm5vZGUgJiYgaW5zdGFuY2UuJHZub2RlLmNvbnRleHQpIHtcbiAgICAgIGluc3RhbmNlLiR2bm9kZS5jb250ZXh0LiRmb3JjZVVwZGF0ZSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybignUm9vdCBvciBtYW51YWxseSBtb3VudGVkIGluc3RhbmNlIG1vZGlmaWVkLiBGdWxsIHJlbG9hZCByZXF1aXJlZC4nKVxuICAgIH1cbiAgfSlcbn0pXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLWhvdC1yZWxvYWQtYXBpL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = bootstrap;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

eval("var disposed = false\nfunction injectStyle (ssrContext) {\n  if (disposed) return\n  __webpack_require__(4)\n}\nvar Component = __webpack_require__(5)(\n  /* script */\n  __webpack_require__(3),\n  /* template */\n  __webpack_require__(6),\n  /* styles */\n  injectStyle,\n  /* scopeId */\n  null,\n  /* moduleIdentifier (server only) */\n  null\n)\nComponent.options.__file = \"/Users/rahim/Desktop/Valet/mylogbook/resources/assets/src/App.vue\"\nif (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== \"default\" && key.substr(0, 2) !== \"__\"})) {console.error(\"named exports are not supported in *.vue files.\")}\nif (Component.options.functional) {console.error(\"[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.\")}\n\n/* hot reload */\nif (true) {(function () {\n  var hotAPI = __webpack_require__(0)\n  hotAPI.install(__webpack_require__(9), false)\n  if (!hotAPI.compatible) return\n  module.hot.accept()\n  if (!module.hot.data) {\n    hotAPI.createRecord(\"data-v-4cbd4450\", Component.options)\n  } else {\n    hotAPI.reload(\"data-v-4cbd4450\", Component.options)\n  }\n  module.hot.dispose(function (data) {\n    disposed = true\n  })\n})()}\n\nmodule.exports = Component.exports\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvc3JjL0FwcC52dWU/MmIwZCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2V4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbi9sb2FkZXIuanM/e1xcXCJvbWl0XFxcIjoxLFxcXCJyZW1vdmVcXFwiOnRydWV9IXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlciEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTRjYmQ0NDUwXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSFzYXNzLWxvYWRlciEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL0FwcC52dWVcIilcbn1cbnZhciBDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKShcbiAgLyogc2NyaXB0ICovXG4gIHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlciEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0FwcC52dWVcIiksXG4gIC8qIHRlbXBsYXRlICovXG4gIHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTRjYmQ0NDUwXFxcIn0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL0FwcC52dWVcIiksXG4gIC8qIHN0eWxlcyAqL1xuICBpbmplY3RTdHlsZSxcbiAgLyogc2NvcGVJZCAqL1xuICBudWxsLFxuICAvKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbiAgbnVsbFxuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCIvVXNlcnMvcmFoaW0vRGVza3RvcC9WYWxldC9teWxvZ2Jvb2svcmVzb3VyY2VzL2Fzc2V0cy9zcmMvQXBwLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gQXBwLnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi00Y2JkNDQ1MFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTRjYmQ0NDUwXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL3NyYy9BcHAudnVlXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bootstrap__ = __webpack_require__(8);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_resource__ = __webpack_require__(7);\nvar _this = this;\n\n//\n//\n//\n//\n//\n//\n//\n\n\n\n\n// Plugins\nVue.use(__WEBPACK_IMPORTED_MODULE_1_vue_resource__[\"a\" /* default */]);\n\n// Config\nVue.config.silent = false;\n\nVue.http.options.root = \"http://mylogbook.dev\";\n\n// Create app instance\nnew Vue({\n\tel: '#app',\n\trender: function render(h) {\n\t\treturn h(_this);\n\t},\n\tdata: {\n\t\tmessage: 'Hello'\n\t}\n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvc3JjL0FwcC52dWU/NGE3OSJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX3RoaXMgPSB0aGlzO1xuXG4vL1xuLy9cbi8vXG4vL1xuLy9cbi8vXG4vL1xuXG5pbXBvcnQgQm9vdHN0cmFwIGZyb20gJy4vYm9vdHN0cmFwJztcbmltcG9ydCBWdWVSZXNvdXJjZSBmcm9tICd2dWUtcmVzb3VyY2UnO1xuXG4vLyBQbHVnaW5zXG5WdWUudXNlKFZ1ZVJlc291cmNlKTtcblxuLy8gQ29uZmlnXG5WdWUuY29uZmlnLnNpbGVudCA9IGVudi52dWUuc2lsZW50O1xuXG5WdWUuaHR0cC5vcHRpb25zLnJvb3QgPSBlbnYubXlsYi5hcGlfdXJsO1xuXG4vLyBDcmVhdGUgYXBwIGluc3RhbmNlXG5uZXcgVnVlKHtcblx0ZWw6ICcjYXBwJyxcblx0cmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoaCkge1xuXHRcdHJldHVybiBoKF90aGlzKTtcblx0fSxcblx0ZGF0YToge1xuXHRcdG1lc3NhZ2U6ICdIZWxsbydcblx0fVxufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JhYmVsLWxvYWRlci9saWIhLi9+L3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL3NyYy9BcHAudnVlXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvc3JjL0FwcC52dWU/NmIxMyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9leHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4vbG9hZGVyLmpzP3tcIm9taXRcIjoxLFwicmVtb3ZlXCI6dHJ1ZX0hLi9+L3Z1ZS1zdHlsZS1sb2FkZXIhLi9+L2Nzcy1sb2FkZXIhLi9+L3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTRjYmQ0NDUwXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vfi9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vcmVzb3VyY2VzL2Fzc2V0cy9zcmMvQXBwLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

eval("/* globals __VUE_SSR_CONTEXT__ */\n\n// this module is a runtime utility for cleaner component module output and will\n// be included in the final webpack user bundle\n\nmodule.exports = function normalizeComponent (\n  rawScriptExports,\n  compiledTemplate,\n  injectStyles,\n  scopeId,\n  moduleIdentifier /* server only */\n) {\n  var esModule\n  var scriptExports = rawScriptExports = rawScriptExports || {}\n\n  // ES6 modules interop\n  var type = typeof rawScriptExports.default\n  if (type === 'object' || type === 'function') {\n    esModule = rawScriptExports\n    scriptExports = rawScriptExports.default\n  }\n\n  // Vue.extend constructor export interop\n  var options = typeof scriptExports === 'function'\n    ? scriptExports.options\n    : scriptExports\n\n  // render functions\n  if (compiledTemplate) {\n    options.render = compiledTemplate.render\n    options.staticRenderFns = compiledTemplate.staticRenderFns\n  }\n\n  // scopedId\n  if (scopeId) {\n    options._scopeId = scopeId\n  }\n\n  var hook\n  if (moduleIdentifier) { // server build\n    hook = function (context) {\n      // 2.3 injection\n      context = context || (this.$vnode && this.$vnode.ssrContext)\n      // 2.2 with runInNewContext: true\n      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {\n        context = __VUE_SSR_CONTEXT__\n      }\n      // inject component styles\n      if (injectStyles) {\n        injectStyles.call(this, context)\n      }\n      // register component module identifier for async chunk inferrence\n      if (context && context._registeredComponents) {\n        context._registeredComponents.add(moduleIdentifier)\n      }\n    }\n    // used by ssr in case component is cached and beforeCreate\n    // never gets called\n    options._ssrRegister = hook\n  } else if (injectStyles) {\n    hook = injectStyles\n  }\n\n  if (hook) {\n    // inject component registration as beforeCreate hook\n    var existing = options.beforeCreate\n    options.beforeCreate = existing\n      ? [].concat(existing, hook)\n      : [hook]\n  }\n\n  return {\n    esModule: esModule,\n    exports: scriptExports,\n    options: options\n  }\n}\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL34vdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXIuanM/ZDRmMyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWxzIF9fVlVFX1NTUl9DT05URVhUX18gKi9cblxuLy8gdGhpcyBtb2R1bGUgaXMgYSBydW50aW1lIHV0aWxpdHkgZm9yIGNsZWFuZXIgY29tcG9uZW50IG1vZHVsZSBvdXRwdXQgYW5kIHdpbGxcbi8vIGJlIGluY2x1ZGVkIGluIHRoZSBmaW5hbCB3ZWJwYWNrIHVzZXIgYnVuZGxlXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50IChcbiAgcmF3U2NyaXB0RXhwb3J0cyxcbiAgY29tcGlsZWRUZW1wbGF0ZSxcbiAgaW5qZWN0U3R5bGVzLFxuICBzY29wZUlkLFxuICBtb2R1bGVJZGVudGlmaWVyIC8qIHNlcnZlciBvbmx5ICovXG4pIHtcbiAgdmFyIGVzTW9kdWxlXG4gIHZhciBzY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMgfHwge31cblxuICAvLyBFUzYgbW9kdWxlcyBpbnRlcm9wXG4gIHZhciB0eXBlID0gdHlwZW9mIHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGVzTW9kdWxlID0gcmF3U2NyaXB0RXhwb3J0c1xuICAgIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzLmRlZmF1bHRcbiAgfVxuXG4gIC8vIFZ1ZS5leHRlbmQgY29uc3RydWN0b3IgZXhwb3J0IGludGVyb3BcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2NyaXB0RXhwb3J0cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gc2NyaXB0RXhwb3J0cy5vcHRpb25zXG4gICAgOiBzY3JpcHRFeHBvcnRzXG5cbiAgLy8gcmVuZGVyIGZ1bmN0aW9uc1xuICBpZiAoY29tcGlsZWRUZW1wbGF0ZSkge1xuICAgIG9wdGlvbnMucmVuZGVyID0gY29tcGlsZWRUZW1wbGF0ZS5yZW5kZXJcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IGNvbXBpbGVkVGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zXG4gIH1cblxuICAvLyBzY29wZWRJZFxuICBpZiAoc2NvcGVJZCkge1xuICAgIG9wdGlvbnMuX3Njb3BlSWQgPSBzY29wZUlkXG4gIH1cblxuICB2YXIgaG9va1xuICBpZiAobW9kdWxlSWRlbnRpZmllcikgeyAvLyBzZXJ2ZXIgYnVpbGRcbiAgICBob29rID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgIC8vIDIuMyBpbmplY3Rpb25cbiAgICAgIGNvbnRleHQgPSBjb250ZXh0IHx8ICh0aGlzLiR2bm9kZSAmJiB0aGlzLiR2bm9kZS5zc3JDb250ZXh0KVxuICAgICAgLy8gMi4yIHdpdGggcnVuSW5OZXdDb250ZXh0OiB0cnVlXG4gICAgICBpZiAoIWNvbnRleHQgJiYgdHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX18gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnRleHQgPSBfX1ZVRV9TU1JfQ09OVEVYVF9fXG4gICAgICB9XG4gICAgICAvLyBpbmplY3QgY29tcG9uZW50IHN0eWxlc1xuICAgICAgaWYgKGluamVjdFN0eWxlcykge1xuICAgICAgICBpbmplY3RTdHlsZXMuY2FsbCh0aGlzLCBjb250ZXh0KVxuICAgICAgfVxuICAgICAgLy8gcmVnaXN0ZXIgY29tcG9uZW50IG1vZHVsZSBpZGVudGlmaWVyIGZvciBhc3luYyBjaHVuayBpbmZlcnJlbmNlXG4gICAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cykge1xuICAgICAgICBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQobW9kdWxlSWRlbnRpZmllcilcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gdXNlZCBieSBzc3IgaW4gY2FzZSBjb21wb25lbnQgaXMgY2FjaGVkIGFuZCBiZWZvcmVDcmVhdGVcbiAgICAvLyBuZXZlciBnZXRzIGNhbGxlZFxuICAgIG9wdGlvbnMuX3NzclJlZ2lzdGVyID0gaG9va1xuICB9IGVsc2UgaWYgKGluamVjdFN0eWxlcykge1xuICAgIGhvb2sgPSBpbmplY3RTdHlsZXNcbiAgfVxuXG4gIGlmIChob29rKSB7XG4gICAgLy8gaW5qZWN0IGNvbXBvbmVudCByZWdpc3RyYXRpb24gYXMgYmVmb3JlQ3JlYXRlIGhvb2tcbiAgICB2YXIgZXhpc3RpbmcgPSBvcHRpb25zLmJlZm9yZUNyZWF0ZVxuICAgIG9wdGlvbnMuYmVmb3JlQ3JlYXRlID0gZXhpc3RpbmdcbiAgICAgID8gW10uY29uY2F0KGV4aXN0aW5nLCBob29rKVxuICAgICAgOiBbaG9va11cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZXNNb2R1bGU6IGVzTW9kdWxlLFxuICAgIGV4cG9ydHM6IHNjcmlwdEV4cG9ydHMsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;\n  return _c('main', {\n    attrs: {\n      \"id\": \"app\"\n    }\n  }, [_vm._t(\"default\")], 2)\n},staticRenderFns: []}\nmodule.exports.render._withStripped = true\nif (true) {\n  module.hot.accept()\n  if (module.hot.data) {\n     __webpack_require__(0).rerender(\"data-v-4cbd4450\", module.exports)\n  }\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvc3JjL0FwcC52dWU/ZmRjNiJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uICgpe3ZhciBfdm09dGhpczt2YXIgX2g9X3ZtLiRjcmVhdGVFbGVtZW50O3ZhciBfYz1fdm0uX3NlbGYuX2N8fF9oO1xuICByZXR1cm4gX2MoJ21haW4nLCB7XG4gICAgYXR0cnM6IHtcbiAgICAgIFwiaWRcIjogXCJhcHBcIlxuICAgIH1cbiAgfSwgW192bS5fdChcImRlZmF1bHRcIildLCAyKVxufSxzdGF0aWNSZW5kZXJGbnM6IFtdfVxubW9kdWxlLmV4cG9ydHMucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi00Y2JkNDQ1MFwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTRjYmQ0NDUwXCJ9IS4vfi92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL3NyYy9BcHAudnVlXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* unused harmony export Url */\n/* unused harmony export Http */\n/* unused harmony export Resource */\n/*!\n * vue-resource v1.3.1\n * https://github.com/pagekit/vue-resource\n * Released under the MIT License.\n */\n\n/**\n * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)\n */\n\nvar RESOLVED = 0;\nvar REJECTED = 1;\nvar PENDING  = 2;\n\nfunction Promise$1(executor) {\n\n    this.state = PENDING;\n    this.value = undefined;\n    this.deferred = [];\n\n    var promise = this;\n\n    try {\n        executor(function (x) {\n            promise.resolve(x);\n        }, function (r) {\n            promise.reject(r);\n        });\n    } catch (e) {\n        promise.reject(e);\n    }\n}\n\nPromise$1.reject = function (r) {\n    return new Promise$1(function (resolve, reject) {\n        reject(r);\n    });\n};\n\nPromise$1.resolve = function (x) {\n    return new Promise$1(function (resolve, reject) {\n        resolve(x);\n    });\n};\n\nPromise$1.all = function all(iterable) {\n    return new Promise$1(function (resolve, reject) {\n        var count = 0, result = [];\n\n        if (iterable.length === 0) {\n            resolve(result);\n        }\n\n        function resolver(i) {\n            return function (x) {\n                result[i] = x;\n                count += 1;\n\n                if (count === iterable.length) {\n                    resolve(result);\n                }\n            };\n        }\n\n        for (var i = 0; i < iterable.length; i += 1) {\n            Promise$1.resolve(iterable[i]).then(resolver(i), reject);\n        }\n    });\n};\n\nPromise$1.race = function race(iterable) {\n    return new Promise$1(function (resolve, reject) {\n        for (var i = 0; i < iterable.length; i += 1) {\n            Promise$1.resolve(iterable[i]).then(resolve, reject);\n        }\n    });\n};\n\nvar p$1 = Promise$1.prototype;\n\np$1.resolve = function resolve(x) {\n    var promise = this;\n\n    if (promise.state === PENDING) {\n        if (x === promise) {\n            throw new TypeError('Promise settled with itself.');\n        }\n\n        var called = false;\n\n        try {\n            var then = x && x['then'];\n\n            if (x !== null && typeof x === 'object' && typeof then === 'function') {\n                then.call(x, function (x) {\n                    if (!called) {\n                        promise.resolve(x);\n                    }\n                    called = true;\n\n                }, function (r) {\n                    if (!called) {\n                        promise.reject(r);\n                    }\n                    called = true;\n                });\n                return;\n            }\n        } catch (e) {\n            if (!called) {\n                promise.reject(e);\n            }\n            return;\n        }\n\n        promise.state = RESOLVED;\n        promise.value = x;\n        promise.notify();\n    }\n};\n\np$1.reject = function reject(reason) {\n    var promise = this;\n\n    if (promise.state === PENDING) {\n        if (reason === promise) {\n            throw new TypeError('Promise settled with itself.');\n        }\n\n        promise.state = REJECTED;\n        promise.value = reason;\n        promise.notify();\n    }\n};\n\np$1.notify = function notify() {\n    var promise = this;\n\n    nextTick(function () {\n        if (promise.state !== PENDING) {\n            while (promise.deferred.length) {\n                var deferred = promise.deferred.shift(),\n                    onResolved = deferred[0],\n                    onRejected = deferred[1],\n                    resolve = deferred[2],\n                    reject = deferred[3];\n\n                try {\n                    if (promise.state === RESOLVED) {\n                        if (typeof onResolved === 'function') {\n                            resolve(onResolved.call(undefined, promise.value));\n                        } else {\n                            resolve(promise.value);\n                        }\n                    } else if (promise.state === REJECTED) {\n                        if (typeof onRejected === 'function') {\n                            resolve(onRejected.call(undefined, promise.value));\n                        } else {\n                            reject(promise.value);\n                        }\n                    }\n                } catch (e) {\n                    reject(e);\n                }\n            }\n        }\n    });\n};\n\np$1.then = function then(onResolved, onRejected) {\n    var promise = this;\n\n    return new Promise$1(function (resolve, reject) {\n        promise.deferred.push([onResolved, onRejected, resolve, reject]);\n        promise.notify();\n    });\n};\n\np$1.catch = function (onRejected) {\n    return this.then(undefined, onRejected);\n};\n\n/**\n * Promise adapter.\n */\n\nif (typeof Promise === 'undefined') {\n    window.Promise = Promise$1;\n}\n\nfunction PromiseObj(executor, context) {\n\n    if (executor instanceof Promise) {\n        this.promise = executor;\n    } else {\n        this.promise = new Promise(executor.bind(context));\n    }\n\n    this.context = context;\n}\n\nPromiseObj.all = function (iterable, context) {\n    return new PromiseObj(Promise.all(iterable), context);\n};\n\nPromiseObj.resolve = function (value, context) {\n    return new PromiseObj(Promise.resolve(value), context);\n};\n\nPromiseObj.reject = function (reason, context) {\n    return new PromiseObj(Promise.reject(reason), context);\n};\n\nPromiseObj.race = function (iterable, context) {\n    return new PromiseObj(Promise.race(iterable), context);\n};\n\nvar p = PromiseObj.prototype;\n\np.bind = function (context) {\n    this.context = context;\n    return this;\n};\n\np.then = function (fulfilled, rejected) {\n\n    if (fulfilled && fulfilled.bind && this.context) {\n        fulfilled = fulfilled.bind(this.context);\n    }\n\n    if (rejected && rejected.bind && this.context) {\n        rejected = rejected.bind(this.context);\n    }\n\n    return new PromiseObj(this.promise.then(fulfilled, rejected), this.context);\n};\n\np.catch = function (rejected) {\n\n    if (rejected && rejected.bind && this.context) {\n        rejected = rejected.bind(this.context);\n    }\n\n    return new PromiseObj(this.promise.catch(rejected), this.context);\n};\n\np.finally = function (callback) {\n\n    return this.then(function (value) {\n            callback.call(this);\n            return value;\n        }, function (reason) {\n            callback.call(this);\n            return Promise.reject(reason);\n        }\n    );\n};\n\n/**\n * Utility functions.\n */\n\nvar ref = {};\nvar hasOwnProperty = ref.hasOwnProperty;\n\nvar ref$1 = [];\nvar slice = ref$1.slice;\nvar debug = false;\nvar ntick;\n\nvar inBrowser = typeof window !== 'undefined';\n\nvar Util = function (ref) {\n    var config = ref.config;\n    var nextTick = ref.nextTick;\n\n    ntick = nextTick;\n    debug = config.debug || !config.silent;\n};\n\nfunction warn(msg) {\n    if (typeof console !== 'undefined' && debug) {\n        console.warn('[VueResource warn]: ' + msg);\n    }\n}\n\nfunction error(msg) {\n    if (typeof console !== 'undefined') {\n        console.error(msg);\n    }\n}\n\nfunction nextTick(cb, ctx) {\n    return ntick(cb, ctx);\n}\n\nfunction trim(str) {\n    return str ? str.replace(/^\\s*|\\s*$/g, '') : '';\n}\n\nfunction toLower(str) {\n    return str ? str.toLowerCase() : '';\n}\n\nfunction toUpper(str) {\n    return str ? str.toUpperCase() : '';\n}\n\nvar isArray = Array.isArray;\n\nfunction isString(val) {\n    return typeof val === 'string';\n}\n\n\n\nfunction isFunction(val) {\n    return typeof val === 'function';\n}\n\nfunction isObject(obj) {\n    return obj !== null && typeof obj === 'object';\n}\n\nfunction isPlainObject(obj) {\n    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;\n}\n\nfunction isBlob(obj) {\n    return typeof Blob !== 'undefined' && obj instanceof Blob;\n}\n\nfunction isFormData(obj) {\n    return typeof FormData !== 'undefined' && obj instanceof FormData;\n}\n\nfunction when(value, fulfilled, rejected) {\n\n    var promise = PromiseObj.resolve(value);\n\n    if (arguments.length < 2) {\n        return promise;\n    }\n\n    return promise.then(fulfilled, rejected);\n}\n\nfunction options(fn, obj, opts) {\n\n    opts = opts || {};\n\n    if (isFunction(opts)) {\n        opts = opts.call(obj);\n    }\n\n    return merge(fn.bind({$vm: obj, $options: opts}), fn, {$options: opts});\n}\n\nfunction each(obj, iterator) {\n\n    var i, key;\n\n    if (isArray(obj)) {\n        for (i = 0; i < obj.length; i++) {\n            iterator.call(obj[i], obj[i], i);\n        }\n    } else if (isObject(obj)) {\n        for (key in obj) {\n            if (hasOwnProperty.call(obj, key)) {\n                iterator.call(obj[key], obj[key], key);\n            }\n        }\n    }\n\n    return obj;\n}\n\nvar assign = Object.assign || _assign;\n\nfunction merge(target) {\n\n    var args = slice.call(arguments, 1);\n\n    args.forEach(function (source) {\n        _merge(target, source, true);\n    });\n\n    return target;\n}\n\nfunction defaults(target) {\n\n    var args = slice.call(arguments, 1);\n\n    args.forEach(function (source) {\n\n        for (var key in source) {\n            if (target[key] === undefined) {\n                target[key] = source[key];\n            }\n        }\n\n    });\n\n    return target;\n}\n\nfunction _assign(target) {\n\n    var args = slice.call(arguments, 1);\n\n    args.forEach(function (source) {\n        _merge(target, source);\n    });\n\n    return target;\n}\n\nfunction _merge(target, source, deep) {\n    for (var key in source) {\n        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {\n            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {\n                target[key] = {};\n            }\n            if (isArray(source[key]) && !isArray(target[key])) {\n                target[key] = [];\n            }\n            _merge(target[key], source[key], deep);\n        } else if (source[key] !== undefined) {\n            target[key] = source[key];\n        }\n    }\n}\n\n/**\n * Root Prefix Transform.\n */\n\nvar root = function (options$$1, next) {\n\n    var url = next(options$$1);\n\n    if (isString(options$$1.root) && !url.match(/^(https?:)?\\//)) {\n        url = options$$1.root + '/' + url;\n    }\n\n    return url;\n};\n\n/**\n * Query Parameter Transform.\n */\n\nvar query = function (options$$1, next) {\n\n    var urlParams = Object.keys(Url.options.params), query = {}, url = next(options$$1);\n\n    each(options$$1.params, function (value, key) {\n        if (urlParams.indexOf(key) === -1) {\n            query[key] = value;\n        }\n    });\n\n    query = Url.params(query);\n\n    if (query) {\n        url += (url.indexOf('?') == -1 ? '?' : '&') + query;\n    }\n\n    return url;\n};\n\n/**\n * URL Template v2.0.6 (https://github.com/bramstein/url-template)\n */\n\nfunction expand(url, params, variables) {\n\n    var tmpl = parse(url), expanded = tmpl.expand(params);\n\n    if (variables) {\n        variables.push.apply(variables, tmpl.vars);\n    }\n\n    return expanded;\n}\n\nfunction parse(template) {\n\n    var operators = ['+', '#', '.', '/', ';', '?', '&'], variables = [];\n\n    return {\n        vars: variables,\n        expand: function expand(context) {\n            return template.replace(/\\{([^\\{\\}]+)\\}|([^\\{\\}]+)/g, function (_, expression, literal) {\n                if (expression) {\n\n                    var operator = null, values = [];\n\n                    if (operators.indexOf(expression.charAt(0)) !== -1) {\n                        operator = expression.charAt(0);\n                        expression = expression.substr(1);\n                    }\n\n                    expression.split(/,/g).forEach(function (variable) {\n                        var tmp = /([^:\\*]*)(?::(\\d+)|(\\*))?/.exec(variable);\n                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));\n                        variables.push(tmp[1]);\n                    });\n\n                    if (operator && operator !== '+') {\n\n                        var separator = ',';\n\n                        if (operator === '?') {\n                            separator = '&';\n                        } else if (operator !== '#') {\n                            separator = operator;\n                        }\n\n                        return (values.length !== 0 ? operator : '') + values.join(separator);\n                    } else {\n                        return values.join(',');\n                    }\n\n                } else {\n                    return encodeReserved(literal);\n                }\n            });\n        }\n    };\n}\n\nfunction getValues(context, operator, key, modifier) {\n\n    var value = context[key], result = [];\n\n    if (isDefined(value) && value !== '') {\n        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {\n            value = value.toString();\n\n            if (modifier && modifier !== '*') {\n                value = value.substring(0, parseInt(modifier, 10));\n            }\n\n            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));\n        } else {\n            if (modifier === '*') {\n                if (Array.isArray(value)) {\n                    value.filter(isDefined).forEach(function (value) {\n                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));\n                    });\n                } else {\n                    Object.keys(value).forEach(function (k) {\n                        if (isDefined(value[k])) {\n                            result.push(encodeValue(operator, value[k], k));\n                        }\n                    });\n                }\n            } else {\n                var tmp = [];\n\n                if (Array.isArray(value)) {\n                    value.filter(isDefined).forEach(function (value) {\n                        tmp.push(encodeValue(operator, value));\n                    });\n                } else {\n                    Object.keys(value).forEach(function (k) {\n                        if (isDefined(value[k])) {\n                            tmp.push(encodeURIComponent(k));\n                            tmp.push(encodeValue(operator, value[k].toString()));\n                        }\n                    });\n                }\n\n                if (isKeyOperator(operator)) {\n                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));\n                } else if (tmp.length !== 0) {\n                    result.push(tmp.join(','));\n                }\n            }\n        }\n    } else {\n        if (operator === ';') {\n            result.push(encodeURIComponent(key));\n        } else if (value === '' && (operator === '&' || operator === '?')) {\n            result.push(encodeURIComponent(key) + '=');\n        } else if (value === '') {\n            result.push('');\n        }\n    }\n\n    return result;\n}\n\nfunction isDefined(value) {\n    return value !== undefined && value !== null;\n}\n\nfunction isKeyOperator(operator) {\n    return operator === ';' || operator === '&' || operator === '?';\n}\n\nfunction encodeValue(operator, value, key) {\n\n    value = (operator === '+' || operator === '#') ? encodeReserved(value) : encodeURIComponent(value);\n\n    if (key) {\n        return encodeURIComponent(key) + '=' + value;\n    } else {\n        return value;\n    }\n}\n\nfunction encodeReserved(str) {\n    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {\n        if (!/%[0-9A-Fa-f]/.test(part)) {\n            part = encodeURI(part);\n        }\n        return part;\n    }).join('');\n}\n\n/**\n * URL Template (RFC 6570) Transform.\n */\n\nvar template = function (options) {\n\n    var variables = [], url = expand(options.url, options.params, variables);\n\n    variables.forEach(function (key) {\n        delete options.params[key];\n    });\n\n    return url;\n};\n\n/**\n * Service for URL templating.\n */\n\nfunction Url(url, params) {\n\n    var self = this || {}, options$$1 = url, transform;\n\n    if (isString(url)) {\n        options$$1 = {url: url, params: params};\n    }\n\n    options$$1 = merge({}, Url.options, self.$options, options$$1);\n\n    Url.transforms.forEach(function (handler) {\n\n        if (isString(handler)) {\n            handler = Url.transform[handler];\n        }\n\n        if (isFunction(handler)) {\n            transform = factory(handler, transform, self.$vm);\n        }\n\n    });\n\n    return transform(options$$1);\n}\n\n/**\n * Url options.\n */\n\nUrl.options = {\n    url: '',\n    root: null,\n    params: {}\n};\n\n/**\n * Url transforms.\n */\n\nUrl.transform = {template: template, query: query, root: root};\nUrl.transforms = ['template', 'query', 'root'];\n\n/**\n * Encodes a Url parameter string.\n *\n * @param {Object} obj\n */\n\nUrl.params = function (obj) {\n\n    var params = [], escape = encodeURIComponent;\n\n    params.add = function (key, value) {\n\n        if (isFunction(value)) {\n            value = value();\n        }\n\n        if (value === null) {\n            value = '';\n        }\n\n        this.push(escape(key) + '=' + escape(value));\n    };\n\n    serialize(params, obj);\n\n    return params.join('&').replace(/%20/g, '+');\n};\n\n/**\n * Parse a URL and return its components.\n *\n * @param {String} url\n */\n\nUrl.parse = function (url) {\n\n    var el = document.createElement('a');\n\n    if (document.documentMode) {\n        el.href = url;\n        url = el.href;\n    }\n\n    el.href = url;\n\n    return {\n        href: el.href,\n        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',\n        port: el.port,\n        host: el.host,\n        hostname: el.hostname,\n        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,\n        search: el.search ? el.search.replace(/^\\?/, '') : '',\n        hash: el.hash ? el.hash.replace(/^#/, '') : ''\n    };\n};\n\nfunction factory(handler, next, vm) {\n    return function (options$$1) {\n        return handler.call(vm, options$$1, next);\n    };\n}\n\nfunction serialize(params, obj, scope) {\n\n    var array = isArray(obj), plain = isPlainObject(obj), hash;\n\n    each(obj, function (value, key) {\n\n        hash = isObject(value) || isArray(value);\n\n        if (scope) {\n            key = scope + '[' + (plain || hash ? key : '') + ']';\n        }\n\n        if (!scope && array) {\n            params.add(value.name, value.value);\n        } else if (hash) {\n            serialize(params, value, key);\n        } else {\n            params.add(key, value);\n        }\n    });\n}\n\n/**\n * XDomain client (Internet Explorer).\n */\n\nvar xdrClient = function (request) {\n    return new PromiseObj(function (resolve) {\n\n        var xdr = new XDomainRequest(), handler = function (ref) {\n            var type = ref.type;\n\n\n            var status = 0;\n\n            if (type === 'load') {\n                status = 200;\n            } else if (type === 'error') {\n                status = 500;\n            }\n\n            resolve(request.respondWith(xdr.responseText, {status: status}));\n        };\n\n        request.abort = function () { return xdr.abort(); };\n\n        xdr.open(request.method, request.getUrl());\n\n        if (request.timeout) {\n            xdr.timeout = request.timeout;\n        }\n\n        xdr.onload = handler;\n        xdr.onabort = handler;\n        xdr.onerror = handler;\n        xdr.ontimeout = handler;\n        xdr.onprogress = function () {};\n        xdr.send(request.getBody());\n    });\n};\n\n/**\n * CORS Interceptor.\n */\n\nvar SUPPORTS_CORS = inBrowser && 'withCredentials' in new XMLHttpRequest();\n\nvar cors = function (request, next) {\n\n    if (inBrowser) {\n\n        var orgUrl = Url.parse(location.href);\n        var reqUrl = Url.parse(request.getUrl());\n\n        if (reqUrl.protocol !== orgUrl.protocol || reqUrl.host !== orgUrl.host) {\n\n            request.crossOrigin = true;\n            request.emulateHTTP = false;\n\n            if (!SUPPORTS_CORS) {\n                request.client = xdrClient;\n            }\n        }\n    }\n\n    next();\n};\n\n/**\n * Body Interceptor.\n */\n\nvar body = function (request, next) {\n\n    if (isFormData(request.body)) {\n\n        request.headers.delete('Content-Type');\n\n    } else if (isObject(request.body) || isArray(request.body)) {\n\n        if (request.emulateJSON) {\n            request.body = Url.params(request.body);\n            request.headers.set('Content-Type', 'application/x-www-form-urlencoded');\n        } else {\n            request.body = JSON.stringify(request.body);\n        }\n    }\n\n    next(function (response) {\n\n        Object.defineProperty(response, 'data', {\n\n            get: function get() {\n                return this.body;\n            },\n\n            set: function set(body) {\n                this.body = body;\n            }\n\n        });\n\n        return response.bodyText ? when(response.text(), function (text) {\n\n            var type = response.headers.get('Content-Type') || '';\n\n            if (type.indexOf('application/json') === 0 || isJson(text)) {\n\n                try {\n                    response.body = JSON.parse(text);\n                } catch (e) {\n                    response.body = null;\n                }\n\n            } else {\n                response.body = text;\n            }\n\n            return response;\n\n        }) : response;\n\n    });\n};\n\nfunction isJson(str) {\n\n    var start = str.match(/^\\[|^\\{(?!\\{)/), end = {'[': /]$/, '{': /}$/};\n\n    return start && end[start[0]].test(str);\n}\n\n/**\n * JSONP client (Browser).\n */\n\nvar jsonpClient = function (request) {\n    return new PromiseObj(function (resolve) {\n\n        var name = request.jsonp || 'callback', callback = request.jsonpCallback || '_jsonp' + Math.random().toString(36).substr(2), body = null, handler, script;\n\n        handler = function (ref) {\n            var type = ref.type;\n\n\n            var status = 0;\n\n            if (type === 'load' && body !== null) {\n                status = 200;\n            } else if (type === 'error') {\n                status = 500;\n            }\n\n            if (status && window[callback]) {\n                delete window[callback];\n                document.body.removeChild(script);\n            }\n\n            resolve(request.respondWith(body, {status: status}));\n        };\n\n        window[callback] = function (result) {\n            body = JSON.stringify(result);\n        };\n\n        request.abort = function () {\n            handler({type: 'abort'});\n        };\n\n        request.params[name] = callback;\n\n        if (request.timeout) {\n            setTimeout(request.abort, request.timeout);\n        }\n\n        script = document.createElement('script');\n        script.src = request.getUrl();\n        script.type = 'text/javascript';\n        script.async = true;\n        script.onload = handler;\n        script.onerror = handler;\n\n        document.body.appendChild(script);\n    });\n};\n\n/**\n * JSONP Interceptor.\n */\n\nvar jsonp = function (request, next) {\n\n    if (request.method == 'JSONP') {\n        request.client = jsonpClient;\n    }\n\n    next();\n};\n\n/**\n * Before Interceptor.\n */\n\nvar before = function (request, next) {\n\n    if (isFunction(request.before)) {\n        request.before.call(this, request);\n    }\n\n    next();\n};\n\n/**\n * HTTP method override Interceptor.\n */\n\nvar method = function (request, next) {\n\n    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {\n        request.headers.set('X-HTTP-Method-Override', request.method);\n        request.method = 'POST';\n    }\n\n    next();\n};\n\n/**\n * Header Interceptor.\n */\n\nvar header = function (request, next) {\n\n    var headers = assign({}, Http.headers.common,\n        !request.crossOrigin ? Http.headers.custom : {},\n        Http.headers[toLower(request.method)]\n    );\n\n    each(headers, function (value, name) {\n        if (!request.headers.has(name)) {\n            request.headers.set(name, value);\n        }\n    });\n\n    next();\n};\n\n/**\n * XMLHttp client (Browser).\n */\n\nvar xhrClient = function (request) {\n    return new PromiseObj(function (resolve) {\n\n        var xhr = new XMLHttpRequest(), handler = function (event) {\n\n            var response = request.respondWith(\n                'response' in xhr ? xhr.response : xhr.responseText, {\n                    status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug\n                    statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)\n                }\n            );\n\n            each(trim(xhr.getAllResponseHeaders()).split('\\n'), function (row) {\n                response.headers.append(row.slice(0, row.indexOf(':')), row.slice(row.indexOf(':') + 1));\n            });\n\n            resolve(response);\n        };\n\n        request.abort = function () { return xhr.abort(); };\n\n        if (request.progress) {\n            if (request.method === 'GET') {\n                xhr.addEventListener('progress', request.progress);\n            } else if (/^(POST|PUT)$/i.test(request.method)) {\n                xhr.upload.addEventListener('progress', request.progress);\n            }\n        }\n\n        xhr.open(request.method, request.getUrl(), true);\n\n        if (request.timeout) {\n            xhr.timeout = request.timeout;\n        }\n\n        if (request.responseType && 'responseType' in xhr) {\n            xhr.responseType = request.responseType;\n        }\n\n        if (request.withCredentials || request.credentials) {\n            xhr.withCredentials = true;\n        }\n\n        if (!request.crossOrigin) {\n            request.headers.set('X-Requested-With', 'XMLHttpRequest');\n        }\n\n        request.headers.forEach(function (value, name) {\n            xhr.setRequestHeader(name, value);\n        });\n\n        xhr.onload = handler;\n        xhr.onabort = handler;\n        xhr.onerror = handler;\n        xhr.ontimeout = handler;\n        xhr.send(request.getBody());\n    });\n};\n\n/**\n * Http client (Node).\n */\n\nvar nodeClient = function (request) {\n\n    var client = __webpack_require__(10);\n\n    return new PromiseObj(function (resolve) {\n\n        var url = request.getUrl();\n        var body = request.getBody();\n        var method = request.method;\n        var headers = {}, handler;\n\n        request.headers.forEach(function (value, name) {\n            headers[name] = value;\n        });\n\n        client(url, {body: body, method: method, headers: headers}).then(handler = function (resp) {\n\n            var response = request.respondWith(resp.body, {\n                    status: resp.statusCode,\n                    statusText: trim(resp.statusMessage)\n                }\n            );\n\n            each(resp.headers, function (value, name) {\n                response.headers.set(name, value);\n            });\n\n            resolve(response);\n\n        }, function (error$$1) { return handler(error$$1.response); });\n    });\n};\n\n/**\n * Base client.\n */\n\nvar Client = function (context) {\n\n    var reqHandlers = [sendRequest], resHandlers = [], handler;\n\n    if (!isObject(context)) {\n        context = null;\n    }\n\n    function Client(request) {\n        return new PromiseObj(function (resolve) {\n\n            function exec() {\n\n                handler = reqHandlers.pop();\n\n                if (isFunction(handler)) {\n                    handler.call(context, request, next);\n                } else {\n                    warn((\"Invalid interceptor of type \" + (typeof handler) + \", must be a function\"));\n                    next();\n                }\n            }\n\n            function next(response) {\n\n                if (isFunction(response)) {\n\n                    resHandlers.unshift(response);\n\n                } else if (isObject(response)) {\n\n                    resHandlers.forEach(function (handler) {\n                        response = when(response, function (response) {\n                            return handler.call(context, response) || response;\n                        });\n                    });\n\n                    when(response, resolve);\n\n                    return;\n                }\n\n                exec();\n            }\n\n            exec();\n\n        }, context);\n    }\n\n    Client.use = function (handler) {\n        reqHandlers.push(handler);\n    };\n\n    return Client;\n};\n\nfunction sendRequest(request, resolve) {\n\n    var client = request.client || (inBrowser ? xhrClient : nodeClient);\n\n    resolve(client(request));\n}\n\n/**\n * HTTP Headers.\n */\n\nvar Headers = function Headers(headers) {\n    var this$1 = this;\n\n\n    this.map = {};\n\n    each(headers, function (value, name) { return this$1.append(name, value); });\n};\n\nHeaders.prototype.has = function has (name) {\n    return getName(this.map, name) !== null;\n};\n\nHeaders.prototype.get = function get (name) {\n\n    var list = this.map[getName(this.map, name)];\n\n    return list ? list.join() : null;\n};\n\nHeaders.prototype.getAll = function getAll (name) {\n    return this.map[getName(this.map, name)] || [];\n};\n\nHeaders.prototype.set = function set (name, value) {\n    this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];\n};\n\nHeaders.prototype.append = function append (name, value){\n\n    var list = this.map[getName(this.map, name)];\n\n    if (list) {\n        list.push(trim(value));\n    } else {\n        this.set(name, value);\n    }\n};\n\nHeaders.prototype.delete = function delete$1 (name){\n    delete this.map[getName(this.map, name)];\n};\n\nHeaders.prototype.deleteAll = function deleteAll (){\n    this.map = {};\n};\n\nHeaders.prototype.forEach = function forEach (callback, thisArg) {\n        var this$1 = this;\n\n    each(this.map, function (list, name) {\n        each(list, function (value) { return callback.call(thisArg, value, name, this$1); });\n    });\n};\n\nfunction getName(map, name) {\n    return Object.keys(map).reduce(function (prev, curr) {\n        return toLower(name) === toLower(curr) ? curr : prev;\n    }, null);\n}\n\nfunction normalizeName(name) {\n\n    if (/[^a-z0-9\\-#$%&'*+.\\^_`|~]/i.test(name)) {\n        throw new TypeError('Invalid character in header field name');\n    }\n\n    return trim(name);\n}\n\n/**\n * HTTP Response.\n */\n\nvar Response = function Response(body, ref) {\n    var url = ref.url;\n    var headers = ref.headers;\n    var status = ref.status;\n    var statusText = ref.statusText;\n\n\n    this.url = url;\n    this.ok = status >= 200 && status < 300;\n    this.status = status || 0;\n    this.statusText = statusText || '';\n    this.headers = new Headers(headers);\n    this.body = body;\n\n    if (isString(body)) {\n\n        this.bodyText = body;\n\n    } else if (isBlob(body)) {\n\n        this.bodyBlob = body;\n\n        if (isBlobText(body)) {\n            this.bodyText = blobText(body);\n        }\n    }\n};\n\nResponse.prototype.blob = function blob () {\n    return when(this.bodyBlob);\n};\n\nResponse.prototype.text = function text () {\n    return when(this.bodyText);\n};\n\nResponse.prototype.json = function json () {\n    return when(this.text(), function (text) { return JSON.parse(text); });\n};\n\nfunction blobText(body) {\n    return new PromiseObj(function (resolve) {\n\n        var reader = new FileReader();\n\n        reader.readAsText(body);\n        reader.onload = function () {\n            resolve(reader.result);\n        };\n\n    });\n}\n\nfunction isBlobText(body) {\n    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;\n}\n\n/**\n * HTTP Request.\n */\n\nvar Request = function Request(options$$1) {\n\n    this.body = null;\n    this.params = {};\n\n    assign(this, options$$1, {\n        method: toUpper(options$$1.method || 'GET')\n    });\n\n    if (!(this.headers instanceof Headers)) {\n        this.headers = new Headers(this.headers);\n    }\n};\n\nRequest.prototype.getUrl = function getUrl (){\n    return Url(this);\n};\n\nRequest.prototype.getBody = function getBody (){\n    return this.body;\n};\n\nRequest.prototype.respondWith = function respondWith (body, options$$1) {\n    return new Response(body, assign(options$$1 || {}, {url: this.getUrl()}));\n};\n\n/**\n * Service for sending network requests.\n */\n\nvar COMMON_HEADERS = {'Accept': 'application/json, text/plain, */*'};\nvar JSON_CONTENT_TYPE = {'Content-Type': 'application/json;charset=utf-8'};\n\nfunction Http(options$$1) {\n\n    var self = this || {}, client = Client(self.$vm);\n\n    defaults(options$$1 || {}, self.$options, Http.options);\n\n    Http.interceptors.forEach(function (handler) {\n\n        if (isString(handler)) {\n            handler = Http.interceptor[handler];\n        }\n\n        if (isFunction(handler)) {\n            client.use(handler);\n        }\n\n    });\n\n    return client(new Request(options$$1)).then(function (response) {\n\n        return response.ok ? response : PromiseObj.reject(response);\n\n    }, function (response) {\n\n        if (response instanceof Error) {\n            error(response);\n        }\n\n        return PromiseObj.reject(response);\n    });\n}\n\nHttp.options = {};\n\nHttp.headers = {\n    put: JSON_CONTENT_TYPE,\n    post: JSON_CONTENT_TYPE,\n    patch: JSON_CONTENT_TYPE,\n    delete: JSON_CONTENT_TYPE,\n    common: COMMON_HEADERS,\n    custom: {}\n};\n\nHttp.interceptor = {before: before, method: method, body: body, jsonp: jsonp, header: header, cors: cors};\nHttp.interceptors = ['before', 'method', 'body', 'jsonp', 'header', 'cors'];\n\n['get', 'delete', 'head', 'jsonp'].forEach(function (method$$1) {\n\n    Http[method$$1] = function (url, options$$1) {\n        return this(assign(options$$1 || {}, {url: url, method: method$$1}));\n    };\n\n});\n\n['post', 'put', 'patch'].forEach(function (method$$1) {\n\n    Http[method$$1] = function (url, body$$1, options$$1) {\n        return this(assign(options$$1 || {}, {url: url, method: method$$1, body: body$$1}));\n    };\n\n});\n\n/**\n * Service for interacting with RESTful services.\n */\n\nfunction Resource(url, params, actions, options$$1) {\n\n    var self = this || {}, resource = {};\n\n    actions = assign({},\n        Resource.actions,\n        actions\n    );\n\n    each(actions, function (action, name) {\n\n        action = merge({url: url, params: assign({}, params)}, options$$1, action);\n\n        resource[name] = function () {\n            return (self.$http || Http)(opts(action, arguments));\n        };\n    });\n\n    return resource;\n}\n\nfunction opts(action, args) {\n\n    var options$$1 = assign({}, action), params = {}, body;\n\n    switch (args.length) {\n\n        case 2:\n\n            params = args[0];\n            body = args[1];\n\n            break;\n\n        case 1:\n\n            if (/^(POST|PUT|PATCH)$/i.test(options$$1.method)) {\n                body = args[0];\n            } else {\n                params = args[0];\n            }\n\n            break;\n\n        case 0:\n\n            break;\n\n        default:\n\n            throw 'Expected up to 2 arguments [params, body], got ' + args.length + ' arguments';\n    }\n\n    options$$1.body = body;\n    options$$1.params = assign({}, options$$1.params, params);\n\n    return options$$1;\n}\n\nResource.actions = {\n\n    get: {method: 'GET'},\n    save: {method: 'POST'},\n    query: {method: 'GET'},\n    update: {method: 'PUT'},\n    remove: {method: 'DELETE'},\n    delete: {method: 'DELETE'}\n\n};\n\n/**\n * Install plugin.\n */\n\nfunction plugin(Vue) {\n\n    if (plugin.installed) {\n        return;\n    }\n\n    Util(Vue);\n\n    Vue.url = Url;\n    Vue.http = Http;\n    Vue.resource = Resource;\n    Vue.Promise = PromiseObj;\n\n    Object.defineProperties(Vue.prototype, {\n\n        $url: {\n            get: function get() {\n                return options(Vue.url, this, this.$options.url);\n            }\n        },\n\n        $http: {\n            get: function get() {\n                return options(Vue.http, this, this.$options.http);\n            }\n        },\n\n        $resource: {\n            get: function get() {\n                return Vue.resource.bind(this);\n            }\n        },\n\n        $promise: {\n            get: function get() {\n                var this$1 = this;\n\n                return function (executor) { return new Vue.Promise(executor, this$1); };\n            }\n        }\n\n    });\n}\n\nif (typeof window !== 'undefined' && window.Vue) {\n    window.Vue.use(plugin);\n}\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (plugin);\n\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL34vdnVlLXJlc291cmNlL2Rpc3QvdnVlLXJlc291cmNlLmVzMjAxNS5qcz9mYzkwIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogdnVlLXJlc291cmNlIHYxLjMuMVxuICogaHR0cHM6Ly9naXRodWIuY29tL3BhZ2VraXQvdnVlLXJlc291cmNlXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBQcm9taXNlcy9BKyBwb2x5ZmlsbCB2MS4xLjQgKGh0dHBzOi8vZ2l0aHViLmNvbS9icmFtc3RlaW4vcHJvbWlzKVxuICovXG5cbnZhciBSRVNPTFZFRCA9IDA7XG52YXIgUkVKRUNURUQgPSAxO1xudmFyIFBFTkRJTkcgID0gMjtcblxuZnVuY3Rpb24gUHJvbWlzZSQxKGV4ZWN1dG9yKSB7XG5cbiAgICB0aGlzLnN0YXRlID0gUEVORElORztcbiAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZGVmZXJyZWQgPSBbXTtcblxuICAgIHZhciBwcm9taXNlID0gdGhpcztcblxuICAgIHRyeSB7XG4gICAgICAgIGV4ZWN1dG9yKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoeCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICBwcm9taXNlLnJlamVjdChyKTtcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBwcm9taXNlLnJlamVjdChlKTtcbiAgICB9XG59XG5cblByb21pc2UkMS5yZWplY3QgPSBmdW5jdGlvbiAocikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgcmVqZWN0KHIpO1xuICAgIH0pO1xufTtcblxuUHJvbWlzZSQxLnJlc29sdmUgPSBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgcmVzb2x2ZSh4KTtcbiAgICB9KTtcbn07XG5cblByb21pc2UkMS5hbGwgPSBmdW5jdGlvbiBhbGwoaXRlcmFibGUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBjb3VudCA9IDAsIHJlc3VsdCA9IFtdO1xuXG4gICAgICAgIGlmIChpdGVyYWJsZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJlc29sdmVyKGkpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtpXSA9IHg7XG4gICAgICAgICAgICAgICAgY291bnQgKz0gMTtcblxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVyYWJsZS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgUHJvbWlzZSQxLnJlc29sdmUoaXRlcmFibGVbaV0pLnRoZW4ocmVzb2x2ZXIoaSksIHJlamVjdCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cblByb21pc2UkMS5yYWNlID0gZnVuY3Rpb24gcmFjZShpdGVyYWJsZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSQxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVyYWJsZS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgUHJvbWlzZSQxLnJlc29sdmUoaXRlcmFibGVbaV0pLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxudmFyIHAkMSA9IFByb21pc2UkMS5wcm90b3R5cGU7XG5cbnAkMS5yZXNvbHZlID0gZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzO1xuXG4gICAgaWYgKHByb21pc2Uuc3RhdGUgPT09IFBFTkRJTkcpIHtcbiAgICAgICAgaWYgKHggPT09IHByb21pc2UpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2Ugc2V0dGxlZCB3aXRoIGl0c2VsZi4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHRoZW4gPSB4ICYmIHhbJ3RoZW4nXTtcblxuICAgICAgICAgICAgaWYgKHggIT09IG51bGwgJiYgdHlwZW9mIHggPT09ICdvYmplY3QnICYmIHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhlbi5jYWxsKHgsIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnJlc29sdmUoeCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FsbGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnJlamVjdChyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlLnJlamVjdChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb21pc2Uuc3RhdGUgPSBSRVNPTFZFRDtcbiAgICAgICAgcHJvbWlzZS52YWx1ZSA9IHg7XG4gICAgICAgIHByb21pc2Uubm90aWZ5KCk7XG4gICAgfVxufTtcblxucCQxLnJlamVjdCA9IGZ1bmN0aW9uIHJlamVjdChyZWFzb24pIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XG5cbiAgICBpZiAocHJvbWlzZS5zdGF0ZSA9PT0gUEVORElORykge1xuICAgICAgICBpZiAocmVhc29uID09PSBwcm9taXNlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlIHNldHRsZWQgd2l0aCBpdHNlbGYuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm9taXNlLnN0YXRlID0gUkVKRUNURUQ7XG4gICAgICAgIHByb21pc2UudmFsdWUgPSByZWFzb247XG4gICAgICAgIHByb21pc2Uubm90aWZ5KCk7XG4gICAgfVxufTtcblxucCQxLm5vdGlmeSA9IGZ1bmN0aW9uIG5vdGlmeSgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XG5cbiAgICBuZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChwcm9taXNlLnN0YXRlICE9PSBQRU5ESU5HKSB7XG4gICAgICAgICAgICB3aGlsZSAocHJvbWlzZS5kZWZlcnJlZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSBwcm9taXNlLmRlZmVycmVkLnNoaWZ0KCksXG4gICAgICAgICAgICAgICAgICAgIG9uUmVzb2x2ZWQgPSBkZWZlcnJlZFswXSxcbiAgICAgICAgICAgICAgICAgICAgb25SZWplY3RlZCA9IGRlZmVycmVkWzFdLFxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlID0gZGVmZXJyZWRbMl0sXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCA9IGRlZmVycmVkWzNdO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb21pc2Uuc3RhdGUgPT09IFJFU09MVkVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9uUmVzb2x2ZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG9uUmVzb2x2ZWQuY2FsbCh1bmRlZmluZWQsIHByb21pc2UudmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShwcm9taXNlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9taXNlLnN0YXRlID09PSBSRUpFQ1RFRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvblJlamVjdGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShvblJlamVjdGVkLmNhbGwodW5kZWZpbmVkLCBwcm9taXNlLnZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChwcm9taXNlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxucCQxLnRoZW4gPSBmdW5jdGlvbiB0aGVuKG9uUmVzb2x2ZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UkMShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHByb21pc2UuZGVmZXJyZWQucHVzaChbb25SZXNvbHZlZCwgb25SZWplY3RlZCwgcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICAgIHByb21pc2Uubm90aWZ5KCk7XG4gICAgfSk7XG59O1xuXG5wJDEuY2F0Y2ggPSBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbn07XG5cbi8qKlxuICogUHJvbWlzZSBhZGFwdGVyLlxuICovXG5cbmlmICh0eXBlb2YgUHJvbWlzZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuUHJvbWlzZSA9IFByb21pc2UkMTtcbn1cblxuZnVuY3Rpb24gUHJvbWlzZU9iaihleGVjdXRvciwgY29udGV4dCkge1xuXG4gICAgaWYgKGV4ZWN1dG9yIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICB0aGlzLnByb21pc2UgPSBleGVjdXRvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShleGVjdXRvci5iaW5kKGNvbnRleHQpKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xufVxuXG5Qcm9taXNlT2JqLmFsbCA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgY29udGV4dCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZU9iaihQcm9taXNlLmFsbChpdGVyYWJsZSksIGNvbnRleHQpO1xufTtcblxuUHJvbWlzZU9iai5yZXNvbHZlID0gZnVuY3Rpb24gKHZhbHVlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlT2JqKFByb21pc2UucmVzb2x2ZSh2YWx1ZSksIGNvbnRleHQpO1xufTtcblxuUHJvbWlzZU9iai5yZWplY3QgPSBmdW5jdGlvbiAocmVhc29uLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlT2JqKFByb21pc2UucmVqZWN0KHJlYXNvbiksIGNvbnRleHQpO1xufTtcblxuUHJvbWlzZU9iai5yYWNlID0gZnVuY3Rpb24gKGl0ZXJhYmxlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlT2JqKFByb21pc2UucmFjZShpdGVyYWJsZSksIGNvbnRleHQpO1xufTtcblxudmFyIHAgPSBQcm9taXNlT2JqLnByb3RvdHlwZTtcblxucC5iaW5kID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHJldHVybiB0aGlzO1xufTtcblxucC50aGVuID0gZnVuY3Rpb24gKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcblxuICAgIGlmIChmdWxmaWxsZWQgJiYgZnVsZmlsbGVkLmJpbmQgJiYgdGhpcy5jb250ZXh0KSB7XG4gICAgICAgIGZ1bGZpbGxlZCA9IGZ1bGZpbGxlZC5iaW5kKHRoaXMuY29udGV4dCk7XG4gICAgfVxuXG4gICAgaWYgKHJlamVjdGVkICYmIHJlamVjdGVkLmJpbmQgJiYgdGhpcy5jb250ZXh0KSB7XG4gICAgICAgIHJlamVjdGVkID0gcmVqZWN0ZWQuYmluZCh0aGlzLmNvbnRleHQpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZU9iaih0aGlzLnByb21pc2UudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKSwgdGhpcy5jb250ZXh0KTtcbn07XG5cbnAuY2F0Y2ggPSBmdW5jdGlvbiAocmVqZWN0ZWQpIHtcblxuICAgIGlmIChyZWplY3RlZCAmJiByZWplY3RlZC5iaW5kICYmIHRoaXMuY29udGV4dCkge1xuICAgICAgICByZWplY3RlZCA9IHJlamVjdGVkLmJpbmQodGhpcy5jb250ZXh0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2VPYmoodGhpcy5wcm9taXNlLmNhdGNoKHJlamVjdGVkKSwgdGhpcy5jb250ZXh0KTtcbn07XG5cbnAuZmluYWxseSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXG4gICAgcmV0dXJuIHRoaXMudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgICAgICAgfVxuICAgICk7XG59O1xuXG4vKipcbiAqIFV0aWxpdHkgZnVuY3Rpb25zLlxuICovXG5cbnZhciByZWYgPSB7fTtcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IHJlZi5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIHJlZiQxID0gW107XG52YXIgc2xpY2UgPSByZWYkMS5zbGljZTtcbnZhciBkZWJ1ZyA9IGZhbHNlO1xudmFyIG50aWNrO1xuXG52YXIgaW5Ccm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG5cbnZhciBVdGlsID0gZnVuY3Rpb24gKHJlZikge1xuICAgIHZhciBjb25maWcgPSByZWYuY29uZmlnO1xuICAgIHZhciBuZXh0VGljayA9IHJlZi5uZXh0VGljaztcblxuICAgIG50aWNrID0gbmV4dFRpY2s7XG4gICAgZGVidWcgPSBjb25maWcuZGVidWcgfHwgIWNvbmZpZy5zaWxlbnQ7XG59O1xuXG5mdW5jdGlvbiB3YXJuKG1zZykge1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGVidWcpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdbVnVlUmVzb3VyY2Ugd2Fybl06ICcgKyBtc2cpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZXJyb3IobXNnKSB7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBuZXh0VGljayhjYiwgY3R4KSB7XG4gICAgcmV0dXJuIG50aWNrKGNiLCBjdHgpO1xufVxuXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICAgIHJldHVybiBzdHIgPyBzdHIucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpIDogJyc7XG59XG5cbmZ1bmN0aW9uIHRvTG93ZXIoc3RyKSB7XG4gICAgcmV0dXJuIHN0ciA/IHN0ci50b0xvd2VyQ2FzZSgpIDogJyc7XG59XG5cbmZ1bmN0aW9uIHRvVXBwZXIoc3RyKSB7XG4gICAgcmV0dXJuIHN0ciA/IHN0ci50b1VwcGVyQ2FzZSgpIDogJyc7XG59XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG5cblxuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jztcbn1cblxuZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcbiAgICByZXR1cm4gaXNPYmplY3Qob2JqKSAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSA9PSBPYmplY3QucHJvdG90eXBlO1xufVxuXG5mdW5jdGlvbiBpc0Jsb2Iob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBvYmogaW5zdGFuY2VvZiBCbG9iO1xufVxuXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKG9iaikge1xuICAgIHJldHVybiB0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnICYmIG9iaiBpbnN0YW5jZW9mIEZvcm1EYXRhO1xufVxuXG5mdW5jdGlvbiB3aGVuKHZhbHVlLCBmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG5cbiAgICB2YXIgcHJvbWlzZSA9IFByb21pc2VPYmoucmVzb2x2ZSh2YWx1ZSk7XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2UudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTtcbn1cblxuZnVuY3Rpb24gb3B0aW9ucyhmbiwgb2JqLCBvcHRzKSB7XG5cbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKG9wdHMpKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzLmNhbGwob2JqKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWVyZ2UoZm4uYmluZCh7JHZtOiBvYmosICRvcHRpb25zOiBvcHRzfSksIGZuLCB7JG9wdGlvbnM6IG9wdHN9KTtcbn1cblxuZnVuY3Rpb24gZWFjaChvYmosIGl0ZXJhdG9yKSB7XG5cbiAgICB2YXIgaSwga2V5O1xuXG4gICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpdGVyYXRvci5jYWxsKG9ialtpXSwgb2JqW2ldLCBpKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNPYmplY3Qob2JqKSkge1xuICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwob2JqW2tleV0sIG9ialtrZXldLCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn1cblxudmFyIGFzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgX2Fzc2lnbjtcblxuZnVuY3Rpb24gbWVyZ2UodGFyZ2V0KSB7XG5cbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICAgIGFyZ3MuZm9yRWFjaChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgIF9tZXJnZSh0YXJnZXQsIHNvdXJjZSwgdHJ1ZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0cyh0YXJnZXQpIHtcblxuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uIChzb3VyY2UpIHtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0W2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gX2Fzc2lnbih0YXJnZXQpIHtcblxuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgX21lcmdlKHRhcmdldCwgc291cmNlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIF9tZXJnZSh0YXJnZXQsIHNvdXJjZSwgZGVlcCkge1xuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKGRlZXAgJiYgKGlzUGxhaW5PYmplY3Qoc291cmNlW2tleV0pIHx8IGlzQXJyYXkoc291cmNlW2tleV0pKSkge1xuICAgICAgICAgICAgaWYgKGlzUGxhaW5PYmplY3Qoc291cmNlW2tleV0pICYmICFpc1BsYWluT2JqZWN0KHRhcmdldFtrZXldKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNBcnJheShzb3VyY2Vba2V5XSkgJiYgIWlzQXJyYXkodGFyZ2V0W2tleV0pKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9tZXJnZSh0YXJnZXRba2V5XSwgc291cmNlW2tleV0sIGRlZXApO1xuICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogUm9vdCBQcmVmaXggVHJhbnNmb3JtLlxuICovXG5cbnZhciByb290ID0gZnVuY3Rpb24gKG9wdGlvbnMkJDEsIG5leHQpIHtcblxuICAgIHZhciB1cmwgPSBuZXh0KG9wdGlvbnMkJDEpO1xuXG4gICAgaWYgKGlzU3RyaW5nKG9wdGlvbnMkJDEucm9vdCkgJiYgIXVybC5tYXRjaCgvXihodHRwcz86KT9cXC8vKSkge1xuICAgICAgICB1cmwgPSBvcHRpb25zJCQxLnJvb3QgKyAnLycgKyB1cmw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVybDtcbn07XG5cbi8qKlxuICogUXVlcnkgUGFyYW1ldGVyIFRyYW5zZm9ybS5cbiAqL1xuXG52YXIgcXVlcnkgPSBmdW5jdGlvbiAob3B0aW9ucyQkMSwgbmV4dCkge1xuXG4gICAgdmFyIHVybFBhcmFtcyA9IE9iamVjdC5rZXlzKFVybC5vcHRpb25zLnBhcmFtcyksIHF1ZXJ5ID0ge30sIHVybCA9IG5leHQob3B0aW9ucyQkMSk7XG5cbiAgICBlYWNoKG9wdGlvbnMkJDEucGFyYW1zLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICBpZiAodXJsUGFyYW1zLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHF1ZXJ5W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcXVlcnkgPSBVcmwucGFyYW1zKHF1ZXJ5KTtcblxuICAgIGlmIChxdWVyeSkge1xuICAgICAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT0gLTEgPyAnPycgOiAnJicpICsgcXVlcnk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVybDtcbn07XG5cbi8qKlxuICogVVJMIFRlbXBsYXRlIHYyLjAuNiAoaHR0cHM6Ly9naXRodWIuY29tL2JyYW1zdGVpbi91cmwtdGVtcGxhdGUpXG4gKi9cblxuZnVuY3Rpb24gZXhwYW5kKHVybCwgcGFyYW1zLCB2YXJpYWJsZXMpIHtcblxuICAgIHZhciB0bXBsID0gcGFyc2UodXJsKSwgZXhwYW5kZWQgPSB0bXBsLmV4cGFuZChwYXJhbXMpO1xuXG4gICAgaWYgKHZhcmlhYmxlcykge1xuICAgICAgICB2YXJpYWJsZXMucHVzaC5hcHBseSh2YXJpYWJsZXMsIHRtcGwudmFycyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4cGFuZGVkO1xufVxuXG5mdW5jdGlvbiBwYXJzZSh0ZW1wbGF0ZSkge1xuXG4gICAgdmFyIG9wZXJhdG9ycyA9IFsnKycsICcjJywgJy4nLCAnLycsICc7JywgJz8nLCAnJiddLCB2YXJpYWJsZXMgPSBbXTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHZhcnM6IHZhcmlhYmxlcyxcbiAgICAgICAgZXhwYW5kOiBmdW5jdGlvbiBleHBhbmQoY29udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlLnJlcGxhY2UoL1xceyhbXlxce1xcfV0rKVxcfXwoW15cXHtcXH1dKykvZywgZnVuY3Rpb24gKF8sIGV4cHJlc3Npb24sIGxpdGVyYWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXhwcmVzc2lvbikge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBvcGVyYXRvciA9IG51bGwsIHZhbHVlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRvcnMuaW5kZXhPZihleHByZXNzaW9uLmNoYXJBdCgwKSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRvciA9IGV4cHJlc3Npb24uY2hhckF0KDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9IGV4cHJlc3Npb24uc3Vic3RyKDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbi5zcGxpdCgvLC9nKS5mb3JFYWNoKGZ1bmN0aW9uICh2YXJpYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9IC8oW146XFwqXSopKD86OihcXGQrKXwoXFwqKSk/Ly5leGVjKHZhcmlhYmxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoLmFwcGx5KHZhbHVlcywgZ2V0VmFsdWVzKGNvbnRleHQsIG9wZXJhdG9yLCB0bXBbMV0sIHRtcFsyXSB8fCB0bXBbM10pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlcy5wdXNoKHRtcFsxXSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRvciAmJiBvcGVyYXRvciAhPT0gJysnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXBhcmF0b3IgPSAnLCc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcGVyYXRvciA9PT0gJz8nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VwYXJhdG9yID0gJyYnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChvcGVyYXRvciAhPT0gJyMnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VwYXJhdG9yID0gb3BlcmF0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodmFsdWVzLmxlbmd0aCAhPT0gMCA/IG9wZXJhdG9yIDogJycpICsgdmFsdWVzLmpvaW4oc2VwYXJhdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXMuam9pbignLCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW5jb2RlUmVzZXJ2ZWQobGl0ZXJhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBnZXRWYWx1ZXMoY29udGV4dCwgb3BlcmF0b3IsIGtleSwgbW9kaWZpZXIpIHtcblxuICAgIHZhciB2YWx1ZSA9IGNvbnRleHRba2V5XSwgcmVzdWx0ID0gW107XG5cbiAgICBpZiAoaXNEZWZpbmVkKHZhbHVlKSAmJiB2YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuXG4gICAgICAgICAgICBpZiAobW9kaWZpZXIgJiYgbW9kaWZpZXIgIT09ICcqJykge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3Vic3RyaW5nKDAsIHBhcnNlSW50KG1vZGlmaWVyLCAxMCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQucHVzaChlbmNvZGVWYWx1ZShvcGVyYXRvciwgdmFsdWUsIGlzS2V5T3BlcmF0b3Iob3BlcmF0b3IpID8ga2V5IDogbnVsbCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG1vZGlmaWVyID09PSAnKicpIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUuZmlsdGVyKGlzRGVmaW5lZCkuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZSwgaXNLZXlPcGVyYXRvcihvcGVyYXRvcikgPyBrZXkgOiBudWxsKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNEZWZpbmVkKHZhbHVlW2tdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVuY29kZVZhbHVlKG9wZXJhdG9yLCB2YWx1ZVtrXSwgaykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciB0bXAgPSBbXTtcblxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5maWx0ZXIoaXNEZWZpbmVkKS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG1wLnB1c2goZW5jb2RlVmFsdWUob3BlcmF0b3IsIHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHZhbHVlKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNEZWZpbmVkKHZhbHVlW2tdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcC5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG1wLnB1c2goZW5jb2RlVmFsdWUob3BlcmF0b3IsIHZhbHVlW2tdLnRvU3RyaW5nKCkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzS2V5T3BlcmF0b3Iob3BlcmF0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0nICsgdG1wLmpvaW4oJywnKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0bXAubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRtcC5qb2luKCcsJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChvcGVyYXRvciA9PT0gJzsnKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09ICcnICYmIChvcGVyYXRvciA9PT0gJyYnIHx8IG9wZXJhdG9yID09PSAnPycpKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCgnJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBpc0RlZmluZWQodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNLZXlPcGVyYXRvcihvcGVyYXRvcikge1xuICAgIHJldHVybiBvcGVyYXRvciA9PT0gJzsnIHx8IG9wZXJhdG9yID09PSAnJicgfHwgb3BlcmF0b3IgPT09ICc/Jztcbn1cblxuZnVuY3Rpb24gZW5jb2RlVmFsdWUob3BlcmF0b3IsIHZhbHVlLCBrZXkpIHtcblxuICAgIHZhbHVlID0gKG9wZXJhdG9yID09PSAnKycgfHwgb3BlcmF0b3IgPT09ICcjJykgPyBlbmNvZGVSZXNlcnZlZCh2YWx1ZSkgOiBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyAnPScgKyB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBlbmNvZGVSZXNlcnZlZChzdHIpIHtcbiAgICByZXR1cm4gc3RyLnNwbGl0KC8oJVswLTlBLUZhLWZdezJ9KS9nKS5tYXAoZnVuY3Rpb24gKHBhcnQpIHtcbiAgICAgICAgaWYgKCEvJVswLTlBLUZhLWZdLy50ZXN0KHBhcnQpKSB7XG4gICAgICAgICAgICBwYXJ0ID0gZW5jb2RlVVJJKHBhcnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJ0O1xuICAgIH0pLmpvaW4oJycpO1xufVxuXG4vKipcbiAqIFVSTCBUZW1wbGF0ZSAoUkZDIDY1NzApIFRyYW5zZm9ybS5cbiAqL1xuXG52YXIgdGVtcGxhdGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXG4gICAgdmFyIHZhcmlhYmxlcyA9IFtdLCB1cmwgPSBleHBhbmQob3B0aW9ucy51cmwsIG9wdGlvbnMucGFyYW1zLCB2YXJpYWJsZXMpO1xuXG4gICAgdmFyaWFibGVzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBkZWxldGUgb3B0aW9ucy5wYXJhbXNba2V5XTtcbiAgICB9KTtcblxuICAgIHJldHVybiB1cmw7XG59O1xuXG4vKipcbiAqIFNlcnZpY2UgZm9yIFVSTCB0ZW1wbGF0aW5nLlxuICovXG5cbmZ1bmN0aW9uIFVybCh1cmwsIHBhcmFtcykge1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzIHx8IHt9LCBvcHRpb25zJCQxID0gdXJsLCB0cmFuc2Zvcm07XG5cbiAgICBpZiAoaXNTdHJpbmcodXJsKSkge1xuICAgICAgICBvcHRpb25zJCQxID0ge3VybDogdXJsLCBwYXJhbXM6IHBhcmFtc307XG4gICAgfVxuXG4gICAgb3B0aW9ucyQkMSA9IG1lcmdlKHt9LCBVcmwub3B0aW9ucywgc2VsZi4kb3B0aW9ucywgb3B0aW9ucyQkMSk7XG5cbiAgICBVcmwudHJhbnNmb3Jtcy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGVyKSB7XG5cbiAgICAgICAgaWYgKGlzU3RyaW5nKGhhbmRsZXIpKSB7XG4gICAgICAgICAgICBoYW5kbGVyID0gVXJsLnRyYW5zZm9ybVtoYW5kbGVyXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSBmYWN0b3J5KGhhbmRsZXIsIHRyYW5zZm9ybSwgc2VsZi4kdm0pO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJldHVybiB0cmFuc2Zvcm0ob3B0aW9ucyQkMSk7XG59XG5cbi8qKlxuICogVXJsIG9wdGlvbnMuXG4gKi9cblxuVXJsLm9wdGlvbnMgPSB7XG4gICAgdXJsOiAnJyxcbiAgICByb290OiBudWxsLFxuICAgIHBhcmFtczoge31cbn07XG5cbi8qKlxuICogVXJsIHRyYW5zZm9ybXMuXG4gKi9cblxuVXJsLnRyYW5zZm9ybSA9IHt0ZW1wbGF0ZTogdGVtcGxhdGUsIHF1ZXJ5OiBxdWVyeSwgcm9vdDogcm9vdH07XG5VcmwudHJhbnNmb3JtcyA9IFsndGVtcGxhdGUnLCAncXVlcnknLCAncm9vdCddO1xuXG4vKipcbiAqIEVuY29kZXMgYSBVcmwgcGFyYW1ldGVyIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKi9cblxuVXJsLnBhcmFtcyA9IGZ1bmN0aW9uIChvYmopIHtcblxuICAgIHZhciBwYXJhbXMgPSBbXSwgZXNjYXBlID0gZW5jb2RlVVJJQ29tcG9uZW50O1xuXG4gICAgcGFyYW1zLmFkZCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhbHVlID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnB1c2goZXNjYXBlKGtleSkgKyAnPScgKyBlc2NhcGUodmFsdWUpKTtcbiAgICB9O1xuXG4gICAgc2VyaWFsaXplKHBhcmFtcywgb2JqKTtcblxuICAgIHJldHVybiBwYXJhbXMuam9pbignJicpLnJlcGxhY2UoLyUyMC9nLCAnKycpO1xufTtcblxuLyoqXG4gKiBQYXJzZSBhIFVSTCBhbmQgcmV0dXJuIGl0cyBjb21wb25lbnRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqL1xuXG5VcmwucGFyc2UgPSBmdW5jdGlvbiAodXJsKSB7XG5cbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRNb2RlKSB7XG4gICAgICAgIGVsLmhyZWYgPSB1cmw7XG4gICAgICAgIHVybCA9IGVsLmhyZWY7XG4gICAgfVxuXG4gICAgZWwuaHJlZiA9IHVybDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IGVsLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiBlbC5wcm90b2NvbCA/IGVsLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIHBvcnQ6IGVsLnBvcnQsXG4gICAgICAgIGhvc3Q6IGVsLmhvc3QsXG4gICAgICAgIGhvc3RuYW1lOiBlbC5ob3N0bmFtZSxcbiAgICAgICAgcGF0aG5hbWU6IGVsLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nID8gZWwucGF0aG5hbWUgOiAnLycgKyBlbC5wYXRobmFtZSxcbiAgICAgICAgc2VhcmNoOiBlbC5zZWFyY2ggPyBlbC5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICBoYXNoOiBlbC5oYXNoID8gZWwuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnXG4gICAgfTtcbn07XG5cbmZ1bmN0aW9uIGZhY3RvcnkoaGFuZGxlciwgbmV4dCwgdm0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG9wdGlvbnMkJDEpIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIuY2FsbCh2bSwgb3B0aW9ucyQkMSwgbmV4dCk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplKHBhcmFtcywgb2JqLCBzY29wZSkge1xuXG4gICAgdmFyIGFycmF5ID0gaXNBcnJheShvYmopLCBwbGFpbiA9IGlzUGxhaW5PYmplY3Qob2JqKSwgaGFzaDtcblxuICAgIGVhY2gob2JqLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuXG4gICAgICAgIGhhc2ggPSBpc09iamVjdCh2YWx1ZSkgfHwgaXNBcnJheSh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHNjb3BlKSB7XG4gICAgICAgICAgICBrZXkgPSBzY29wZSArICdbJyArIChwbGFpbiB8fCBoYXNoID8ga2V5IDogJycpICsgJ10nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzY29wZSAmJiBhcnJheSkge1xuICAgICAgICAgICAgcGFyYW1zLmFkZCh2YWx1ZS5uYW1lLCB2YWx1ZS52YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFzaCkge1xuICAgICAgICAgICAgc2VyaWFsaXplKHBhcmFtcywgdmFsdWUsIGtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJhbXMuYWRkKGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8qKlxuICogWERvbWFpbiBjbGllbnQgKEludGVybmV0IEV4cGxvcmVyKS5cbiAqL1xuXG52YXIgeGRyQ2xpZW50ID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2VPYmooZnVuY3Rpb24gKHJlc29sdmUpIHtcblxuICAgICAgICB2YXIgeGRyID0gbmV3IFhEb21haW5SZXF1ZXN0KCksIGhhbmRsZXIgPSBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IHJlZi50eXBlO1xuXG5cbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSAwO1xuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2xvYWQnKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzID0gMjAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzID0gNTAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXNvbHZlKHJlcXVlc3QucmVzcG9uZFdpdGgoeGRyLnJlc3BvbnNlVGV4dCwge3N0YXR1czogc3RhdHVzfSkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB4ZHIuYWJvcnQoKTsgfTtcblxuICAgICAgICB4ZHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC5nZXRVcmwoKSk7XG5cbiAgICAgICAgaWYgKHJlcXVlc3QudGltZW91dCkge1xuICAgICAgICAgICAgeGRyLnRpbWVvdXQgPSByZXF1ZXN0LnRpbWVvdXQ7XG4gICAgICAgIH1cblxuICAgICAgICB4ZHIub25sb2FkID0gaGFuZGxlcjtcbiAgICAgICAgeGRyLm9uYWJvcnQgPSBoYW5kbGVyO1xuICAgICAgICB4ZHIub25lcnJvciA9IGhhbmRsZXI7XG4gICAgICAgIHhkci5vbnRpbWVvdXQgPSBoYW5kbGVyO1xuICAgICAgICB4ZHIub25wcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHt9O1xuICAgICAgICB4ZHIuc2VuZChyZXF1ZXN0LmdldEJvZHkoKSk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIENPUlMgSW50ZXJjZXB0b3IuXG4gKi9cblxudmFyIFNVUFBPUlRTX0NPUlMgPSBpbkJyb3dzZXIgJiYgJ3dpdGhDcmVkZW50aWFscycgaW4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbnZhciBjb3JzID0gZnVuY3Rpb24gKHJlcXVlc3QsIG5leHQpIHtcblxuICAgIGlmIChpbkJyb3dzZXIpIHtcblxuICAgICAgICB2YXIgb3JnVXJsID0gVXJsLnBhcnNlKGxvY2F0aW9uLmhyZWYpO1xuICAgICAgICB2YXIgcmVxVXJsID0gVXJsLnBhcnNlKHJlcXVlc3QuZ2V0VXJsKCkpO1xuXG4gICAgICAgIGlmIChyZXFVcmwucHJvdG9jb2wgIT09IG9yZ1VybC5wcm90b2NvbCB8fCByZXFVcmwuaG9zdCAhPT0gb3JnVXJsLmhvc3QpIHtcblxuICAgICAgICAgICAgcmVxdWVzdC5jcm9zc09yaWdpbiA9IHRydWU7XG4gICAgICAgICAgICByZXF1ZXN0LmVtdWxhdGVIVFRQID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICghU1VQUE9SVFNfQ09SUykge1xuICAgICAgICAgICAgICAgIHJlcXVlc3QuY2xpZW50ID0geGRyQ2xpZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV4dCgpO1xufTtcblxuLyoqXG4gKiBCb2R5IEludGVyY2VwdG9yLlxuICovXG5cbnZhciBib2R5ID0gZnVuY3Rpb24gKHJlcXVlc3QsIG5leHQpIHtcblxuICAgIGlmIChpc0Zvcm1EYXRhKHJlcXVlc3QuYm9keSkpIHtcblxuICAgICAgICByZXF1ZXN0LmhlYWRlcnMuZGVsZXRlKCdDb250ZW50LVR5cGUnKTtcblxuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QocmVxdWVzdC5ib2R5KSB8fCBpc0FycmF5KHJlcXVlc3QuYm9keSkpIHtcblxuICAgICAgICBpZiAocmVxdWVzdC5lbXVsYXRlSlNPTikge1xuICAgICAgICAgICAgcmVxdWVzdC5ib2R5ID0gVXJsLnBhcmFtcyhyZXF1ZXN0LmJvZHkpO1xuICAgICAgICAgICAgcmVxdWVzdC5oZWFkZXJzLnNldCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVxdWVzdC5ib2R5ID0gSlNPTi5zdHJpbmdpZnkocmVxdWVzdC5ib2R5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5leHQoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3BvbnNlLCAnZGF0YScsIHtcblxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYm9keTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gc2V0KGJvZHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvZHkgPSBib2R5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZS5ib2R5VGV4dCA/IHdoZW4ocmVzcG9uc2UudGV4dCgpLCBmdW5jdGlvbiAodGV4dCkge1xuXG4gICAgICAgICAgICB2YXIgdHlwZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKSB8fCAnJztcblxuICAgICAgICAgICAgaWYgKHR5cGUuaW5kZXhPZignYXBwbGljYXRpb24vanNvbicpID09PSAwIHx8IGlzSnNvbih0ZXh0KSkge1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuYm9keSA9IEpTT04ucGFyc2UodGV4dCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5ib2R5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuYm9keSA9IHRleHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcblxuICAgICAgICB9KSA6IHJlc3BvbnNlO1xuXG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBpc0pzb24oc3RyKSB7XG5cbiAgICB2YXIgc3RhcnQgPSBzdHIubWF0Y2goL15cXFt8Xlxceyg/IVxceykvKSwgZW5kID0geydbJzogL10kLywgJ3snOiAvfSQvfTtcblxuICAgIHJldHVybiBzdGFydCAmJiBlbmRbc3RhcnRbMF1dLnRlc3Qoc3RyKTtcbn1cblxuLyoqXG4gKiBKU09OUCBjbGllbnQgKEJyb3dzZXIpLlxuICovXG5cbnZhciBqc29ucENsaWVudCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlT2JqKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cbiAgICAgICAgdmFyIG5hbWUgPSByZXF1ZXN0Lmpzb25wIHx8ICdjYWxsYmFjaycsIGNhbGxiYWNrID0gcmVxdWVzdC5qc29ucENhbGxiYWNrIHx8ICdfanNvbnAnICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIpLCBib2R5ID0gbnVsbCwgaGFuZGxlciwgc2NyaXB0O1xuXG4gICAgICAgIGhhbmRsZXIgPSBmdW5jdGlvbiAocmVmKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IHJlZi50eXBlO1xuXG5cbiAgICAgICAgICAgIHZhciBzdGF0dXMgPSAwO1xuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2xvYWQnICYmIGJvZHkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSAyMDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSA1MDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdGF0dXMgJiYgd2luZG93W2NhbGxiYWNrXSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB3aW5kb3dbY2FsbGJhY2tdO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmVzb2x2ZShyZXF1ZXN0LnJlc3BvbmRXaXRoKGJvZHksIHtzdGF0dXM6IHN0YXR1c30pKTtcbiAgICAgICAgfTtcblxuICAgICAgICB3aW5kb3dbY2FsbGJhY2tdID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KHJlc3VsdCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGhhbmRsZXIoe3R5cGU6ICdhYm9ydCd9KTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXF1ZXN0LnBhcmFtc1tuYW1lXSA9IGNhbGxiYWNrO1xuXG4gICAgICAgIGlmIChyZXF1ZXN0LnRpbWVvdXQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocmVxdWVzdC5hYm9ydCwgcmVxdWVzdC50aW1lb3V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHQuc3JjID0gcmVxdWVzdC5nZXRVcmwoKTtcbiAgICAgICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IGhhbmRsZXI7XG4gICAgICAgIHNjcmlwdC5vbmVycm9yID0gaGFuZGxlcjtcblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIEpTT05QIEludGVyY2VwdG9yLlxuICovXG5cbnZhciBqc29ucCA9IGZ1bmN0aW9uIChyZXF1ZXN0LCBuZXh0KSB7XG5cbiAgICBpZiAocmVxdWVzdC5tZXRob2QgPT0gJ0pTT05QJykge1xuICAgICAgICByZXF1ZXN0LmNsaWVudCA9IGpzb25wQ2xpZW50O1xuICAgIH1cblxuICAgIG5leHQoKTtcbn07XG5cbi8qKlxuICogQmVmb3JlIEludGVyY2VwdG9yLlxuICovXG5cbnZhciBiZWZvcmUgPSBmdW5jdGlvbiAocmVxdWVzdCwgbmV4dCkge1xuXG4gICAgaWYgKGlzRnVuY3Rpb24ocmVxdWVzdC5iZWZvcmUpKSB7XG4gICAgICAgIHJlcXVlc3QuYmVmb3JlLmNhbGwodGhpcywgcmVxdWVzdCk7XG4gICAgfVxuXG4gICAgbmV4dCgpO1xufTtcblxuLyoqXG4gKiBIVFRQIG1ldGhvZCBvdmVycmlkZSBJbnRlcmNlcHRvci5cbiAqL1xuXG52YXIgbWV0aG9kID0gZnVuY3Rpb24gKHJlcXVlc3QsIG5leHQpIHtcblxuICAgIGlmIChyZXF1ZXN0LmVtdWxhdGVIVFRQICYmIC9eKFBVVHxQQVRDSHxERUxFVEUpJC9pLnRlc3QocmVxdWVzdC5tZXRob2QpKSB7XG4gICAgICAgIHJlcXVlc3QuaGVhZGVycy5zZXQoJ1gtSFRUUC1NZXRob2QtT3ZlcnJpZGUnLCByZXF1ZXN0Lm1ldGhvZCk7XG4gICAgICAgIHJlcXVlc3QubWV0aG9kID0gJ1BPU1QnO1xuICAgIH1cblxuICAgIG5leHQoKTtcbn07XG5cbi8qKlxuICogSGVhZGVyIEludGVyY2VwdG9yLlxuICovXG5cbnZhciBoZWFkZXIgPSBmdW5jdGlvbiAocmVxdWVzdCwgbmV4dCkge1xuXG4gICAgdmFyIGhlYWRlcnMgPSBhc3NpZ24oe30sIEh0dHAuaGVhZGVycy5jb21tb24sXG4gICAgICAgICFyZXF1ZXN0LmNyb3NzT3JpZ2luID8gSHR0cC5oZWFkZXJzLmN1c3RvbSA6IHt9LFxuICAgICAgICBIdHRwLmhlYWRlcnNbdG9Mb3dlcihyZXF1ZXN0Lm1ldGhvZCldXG4gICAgKTtcblxuICAgIGVhY2goaGVhZGVycywgZnVuY3Rpb24gKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIGlmICghcmVxdWVzdC5oZWFkZXJzLmhhcyhuYW1lKSkge1xuICAgICAgICAgICAgcmVxdWVzdC5oZWFkZXJzLnNldChuYW1lLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIG5leHQoKTtcbn07XG5cbi8qKlxuICogWE1MSHR0cCBjbGllbnQgKEJyb3dzZXIpLlxuICovXG5cbnZhciB4aHJDbGllbnQgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZU9iaihmdW5jdGlvbiAocmVzb2x2ZSkge1xuXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSwgaGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSByZXF1ZXN0LnJlc3BvbmRXaXRoKFxuICAgICAgICAgICAgICAgICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dCwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiB4aHIuc3RhdHVzLCAvLyBJRTkgc3RhdHVzIGJ1Z1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzID09PSAxMjIzID8gJ05vIENvbnRlbnQnIDogdHJpbSh4aHIuc3RhdHVzVGV4dClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBlYWNoKHRyaW0oeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKS5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5oZWFkZXJzLmFwcGVuZChyb3cuc2xpY2UoMCwgcm93LmluZGV4T2YoJzonKSksIHJvdy5zbGljZShyb3cuaW5kZXhPZignOicpICsgMSkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB4aHIuYWJvcnQoKTsgfTtcblxuICAgICAgICBpZiAocmVxdWVzdC5wcm9ncmVzcykge1xuICAgICAgICAgICAgaWYgKHJlcXVlc3QubWV0aG9kID09PSAnR0VUJykge1xuICAgICAgICAgICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHJlcXVlc3QucHJvZ3Jlc3MpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgvXihQT1NUfFBVVCkkL2kudGVzdChyZXF1ZXN0Lm1ldGhvZCkpIHtcbiAgICAgICAgICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgcmVxdWVzdC5wcm9ncmVzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC5nZXRVcmwoKSwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKHJlcXVlc3QudGltZW91dCkge1xuICAgICAgICAgICAgeGhyLnRpbWVvdXQgPSByZXF1ZXN0LnRpbWVvdXQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVxdWVzdC5yZXNwb25zZVR5cGUgJiYgJ3Jlc3BvbnNlVHlwZScgaW4geGhyKSB7XG4gICAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gcmVxdWVzdC5yZXNwb25zZVR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgfHwgcmVxdWVzdC5jcmVkZW50aWFscykge1xuICAgICAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXJlcXVlc3QuY3Jvc3NPcmlnaW4pIHtcbiAgICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5zZXQoJ1gtUmVxdWVzdGVkLVdpdGgnLCAnWE1MSHR0cFJlcXVlc3QnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgbmFtZSkge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgdmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICB4aHIub25sb2FkID0gaGFuZGxlcjtcbiAgICAgICAgeGhyLm9uYWJvcnQgPSBoYW5kbGVyO1xuICAgICAgICB4aHIub25lcnJvciA9IGhhbmRsZXI7XG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBoYW5kbGVyO1xuICAgICAgICB4aHIuc2VuZChyZXF1ZXN0LmdldEJvZHkoKSk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIEh0dHAgY2xpZW50IChOb2RlKS5cbiAqL1xuXG52YXIgbm9kZUNsaWVudCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG5cbiAgICB2YXIgY2xpZW50ID0gcmVxdWlyZSgnZ290Jyk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2VPYmooZnVuY3Rpb24gKHJlc29sdmUpIHtcblxuICAgICAgICB2YXIgdXJsID0gcmVxdWVzdC5nZXRVcmwoKTtcbiAgICAgICAgdmFyIGJvZHkgPSByZXF1ZXN0LmdldEJvZHkoKTtcbiAgICAgICAgdmFyIG1ldGhvZCA9IHJlcXVlc3QubWV0aG9kO1xuICAgICAgICB2YXIgaGVhZGVycyA9IHt9LCBoYW5kbGVyO1xuXG4gICAgICAgIHJlcXVlc3QuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgbmFtZSkge1xuICAgICAgICAgICAgaGVhZGVyc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9KTtcblxuICAgICAgICBjbGllbnQodXJsLCB7Ym9keTogYm9keSwgbWV0aG9kOiBtZXRob2QsIGhlYWRlcnM6IGhlYWRlcnN9KS50aGVuKGhhbmRsZXIgPSBmdW5jdGlvbiAocmVzcCkge1xuXG4gICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSByZXF1ZXN0LnJlc3BvbmRXaXRoKHJlc3AuYm9keSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHJlc3Auc3RhdHVzQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogdHJpbShyZXNwLnN0YXR1c01lc3NhZ2UpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZWFjaChyZXNwLmhlYWRlcnMsIGZ1bmN0aW9uICh2YWx1ZSwgbmFtZSkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmhlYWRlcnMuc2V0KG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcblxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IkJDEpIHsgcmV0dXJuIGhhbmRsZXIoZXJyb3IkJDEucmVzcG9uc2UpOyB9KTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogQmFzZSBjbGllbnQuXG4gKi9cblxudmFyIENsaWVudCA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cbiAgICB2YXIgcmVxSGFuZGxlcnMgPSBbc2VuZFJlcXVlc3RdLCByZXNIYW5kbGVycyA9IFtdLCBoYW5kbGVyO1xuXG4gICAgaWYgKCFpc09iamVjdChjb250ZXh0KSkge1xuICAgICAgICBjb250ZXh0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBDbGllbnQocmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VPYmooZnVuY3Rpb24gKHJlc29sdmUpIHtcblxuICAgICAgICAgICAgZnVuY3Rpb24gZXhlYygpIHtcblxuICAgICAgICAgICAgICAgIGhhbmRsZXIgPSByZXFIYW5kbGVycy5wb3AoKTtcblxuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbChjb250ZXh0LCByZXF1ZXN0LCBuZXh0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3YXJuKChcIkludmFsaWQgaW50ZXJjZXB0b3Igb2YgdHlwZSBcIiArICh0eXBlb2YgaGFuZGxlcikgKyBcIiwgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gbmV4dChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24ocmVzcG9uc2UpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzSGFuZGxlcnMudW5zaGlmdChyZXNwb25zZSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHJlc3BvbnNlKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc0hhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gd2hlbihyZXNwb25zZSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZXIuY2FsbChjb250ZXh0LCByZXNwb25zZSkgfHwgcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgd2hlbihyZXNwb25zZSwgcmVzb2x2ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV4ZWMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXhlYygpO1xuXG4gICAgICAgIH0sIGNvbnRleHQpO1xuICAgIH1cblxuICAgIENsaWVudC51c2UgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXFIYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xuICAgIH07XG5cbiAgICByZXR1cm4gQ2xpZW50O1xufTtcblxuZnVuY3Rpb24gc2VuZFJlcXVlc3QocmVxdWVzdCwgcmVzb2x2ZSkge1xuXG4gICAgdmFyIGNsaWVudCA9IHJlcXVlc3QuY2xpZW50IHx8IChpbkJyb3dzZXIgPyB4aHJDbGllbnQgOiBub2RlQ2xpZW50KTtcblxuICAgIHJlc29sdmUoY2xpZW50KHJlcXVlc3QpKTtcbn1cblxuLyoqXG4gKiBIVFRQIEhlYWRlcnMuXG4gKi9cblxudmFyIEhlYWRlcnMgPSBmdW5jdGlvbiBIZWFkZXJzKGhlYWRlcnMpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXG4gICAgdGhpcy5tYXAgPSB7fTtcblxuICAgIGVhY2goaGVhZGVycywgZnVuY3Rpb24gKHZhbHVlLCBuYW1lKSB7IHJldHVybiB0aGlzJDEuYXBwZW5kKG5hbWUsIHZhbHVlKTsgfSk7XG59O1xuXG5IZWFkZXJzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiBoYXMgKG5hbWUpIHtcbiAgICByZXR1cm4gZ2V0TmFtZSh0aGlzLm1hcCwgbmFtZSkgIT09IG51bGw7XG59O1xuXG5IZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKG5hbWUpIHtcblxuICAgIHZhciBsaXN0ID0gdGhpcy5tYXBbZ2V0TmFtZSh0aGlzLm1hcCwgbmFtZSldO1xuXG4gICAgcmV0dXJuIGxpc3QgPyBsaXN0LmpvaW4oKSA6IG51bGw7XG59O1xuXG5IZWFkZXJzLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbiBnZXRBbGwgKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXBbZ2V0TmFtZSh0aGlzLm1hcCwgbmFtZSldIHx8IFtdO1xufTtcblxuSGVhZGVycy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0IChuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUoZ2V0TmFtZSh0aGlzLm1hcCwgbmFtZSkgfHwgbmFtZSldID0gW3RyaW0odmFsdWUpXTtcbn07XG5cbkhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIGFwcGVuZCAobmFtZSwgdmFsdWUpe1xuXG4gICAgdmFyIGxpc3QgPSB0aGlzLm1hcFtnZXROYW1lKHRoaXMubWFwLCBuYW1lKV07XG5cbiAgICBpZiAobGlzdCkge1xuICAgICAgICBsaXN0LnB1c2godHJpbSh2YWx1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0KG5hbWUsIHZhbHVlKTtcbiAgICB9XG59O1xuXG5IZWFkZXJzLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiBkZWxldGUkMSAobmFtZSl7XG4gICAgZGVsZXRlIHRoaXMubWFwW2dldE5hbWUodGhpcy5tYXAsIG5hbWUpXTtcbn07XG5cbkhlYWRlcnMucHJvdG90eXBlLmRlbGV0ZUFsbCA9IGZ1bmN0aW9uIGRlbGV0ZUFsbCAoKXtcbiAgICB0aGlzLm1hcCA9IHt9O1xufTtcblxuSGVhZGVycy5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2ggKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgZWFjaCh0aGlzLm1hcCwgZnVuY3Rpb24gKGxpc3QsIG5hbWUpIHtcbiAgICAgICAgZWFjaChsaXN0LCBmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdmFsdWUsIG5hbWUsIHRoaXMkMSk7IH0pO1xuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gZ2V0TmFtZShtYXAsIG5hbWUpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMobWFwKS5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGN1cnIpIHtcbiAgICAgICAgcmV0dXJuIHRvTG93ZXIobmFtZSkgPT09IHRvTG93ZXIoY3VycikgPyBjdXJyIDogcHJldjtcbiAgICB9LCBudWxsKTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG5cbiAgICBpZiAoL1teYS16MC05XFwtIyQlJicqKy5cXF5fYHx+XS9pLnRlc3QobmFtZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJpbShuYW1lKTtcbn1cblxuLyoqXG4gKiBIVFRQIFJlc3BvbnNlLlxuICovXG5cbnZhciBSZXNwb25zZSA9IGZ1bmN0aW9uIFJlc3BvbnNlKGJvZHksIHJlZikge1xuICAgIHZhciB1cmwgPSByZWYudXJsO1xuICAgIHZhciBoZWFkZXJzID0gcmVmLmhlYWRlcnM7XG4gICAgdmFyIHN0YXR1cyA9IHJlZi5zdGF0dXM7XG4gICAgdmFyIHN0YXR1c1RleHQgPSByZWYuc3RhdHVzVGV4dDtcblxuXG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy5vayA9IHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzIHx8IDA7XG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gc3RhdHVzVGV4dCB8fCAnJztcbiAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhoZWFkZXJzKTtcbiAgICB0aGlzLmJvZHkgPSBib2R5O1xuXG4gICAgaWYgKGlzU3RyaW5nKGJvZHkpKSB7XG5cbiAgICAgICAgdGhpcy5ib2R5VGV4dCA9IGJvZHk7XG5cbiAgICB9IGVsc2UgaWYgKGlzQmxvYihib2R5KSkge1xuXG4gICAgICAgIHRoaXMuYm9keUJsb2IgPSBib2R5O1xuXG4gICAgICAgIGlmIChpc0Jsb2JUZXh0KGJvZHkpKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHlUZXh0ID0gYmxvYlRleHQoYm9keSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5SZXNwb25zZS5wcm90b3R5cGUuYmxvYiA9IGZ1bmN0aW9uIGJsb2IgKCkge1xuICAgIHJldHVybiB3aGVuKHRoaXMuYm9keUJsb2IpO1xufTtcblxuUmVzcG9uc2UucHJvdG90eXBlLnRleHQgPSBmdW5jdGlvbiB0ZXh0ICgpIHtcbiAgICByZXR1cm4gd2hlbih0aGlzLmJvZHlUZXh0KTtcbn07XG5cblJlc3BvbnNlLnByb3RvdHlwZS5qc29uID0gZnVuY3Rpb24ganNvbiAoKSB7XG4gICAgcmV0dXJuIHdoZW4odGhpcy50ZXh0KCksIGZ1bmN0aW9uICh0ZXh0KSB7IHJldHVybiBKU09OLnBhcnNlKHRleHQpOyB9KTtcbn07XG5cbmZ1bmN0aW9uIGJsb2JUZXh0KGJvZHkpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2VPYmooZnVuY3Rpb24gKHJlc29sdmUpIHtcblxuICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICByZWFkZXIucmVhZEFzVGV4dChib2R5KTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdCk7XG4gICAgICAgIH07XG5cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gaXNCbG9iVGV4dChib2R5KSB7XG4gICAgcmV0dXJuIGJvZHkudHlwZS5pbmRleE9mKCd0ZXh0JykgPT09IDAgfHwgYm9keS50eXBlLmluZGV4T2YoJ2pzb24nKSAhPT0gLTE7XG59XG5cbi8qKlxuICogSFRUUCBSZXF1ZXN0LlxuICovXG5cbnZhciBSZXF1ZXN0ID0gZnVuY3Rpb24gUmVxdWVzdChvcHRpb25zJCQxKSB7XG5cbiAgICB0aGlzLmJvZHkgPSBudWxsO1xuICAgIHRoaXMucGFyYW1zID0ge307XG5cbiAgICBhc3NpZ24odGhpcywgb3B0aW9ucyQkMSwge1xuICAgICAgICBtZXRob2Q6IHRvVXBwZXIob3B0aW9ucyQkMS5tZXRob2QgfHwgJ0dFVCcpXG4gICAgfSk7XG5cbiAgICBpZiAoISh0aGlzLmhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSkge1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyh0aGlzLmhlYWRlcnMpO1xuICAgIH1cbn07XG5cblJlcXVlc3QucHJvdG90eXBlLmdldFVybCA9IGZ1bmN0aW9uIGdldFVybCAoKXtcbiAgICByZXR1cm4gVXJsKHRoaXMpO1xufTtcblxuUmVxdWVzdC5wcm90b3R5cGUuZ2V0Qm9keSA9IGZ1bmN0aW9uIGdldEJvZHkgKCl7XG4gICAgcmV0dXJuIHRoaXMuYm9keTtcbn07XG5cblJlcXVlc3QucHJvdG90eXBlLnJlc3BvbmRXaXRoID0gZnVuY3Rpb24gcmVzcG9uZFdpdGggKGJvZHksIG9wdGlvbnMkJDEpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKGJvZHksIGFzc2lnbihvcHRpb25zJCQxIHx8IHt9LCB7dXJsOiB0aGlzLmdldFVybCgpfSkpO1xufTtcblxuLyoqXG4gKiBTZXJ2aWNlIGZvciBzZW5kaW5nIG5ldHdvcmsgcmVxdWVzdHMuXG4gKi9cblxudmFyIENPTU1PTl9IRUFERVJTID0geydBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ307XG52YXIgSlNPTl9DT05URU5UX1RZUEUgPSB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnfTtcblxuZnVuY3Rpb24gSHR0cChvcHRpb25zJCQxKSB7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXMgfHwge30sIGNsaWVudCA9IENsaWVudChzZWxmLiR2bSk7XG5cbiAgICBkZWZhdWx0cyhvcHRpb25zJCQxIHx8IHt9LCBzZWxmLiRvcHRpb25zLCBIdHRwLm9wdGlvbnMpO1xuXG4gICAgSHR0cC5pbnRlcmNlcHRvcnMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlcikge1xuXG4gICAgICAgIGlmIChpc1N0cmluZyhoYW5kbGVyKSkge1xuICAgICAgICAgICAgaGFuZGxlciA9IEh0dHAuaW50ZXJjZXB0b3JbaGFuZGxlcl07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgICAgICAgICAgY2xpZW50LnVzZShoYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2xpZW50KG5ldyBSZXF1ZXN0KG9wdGlvbnMkJDEpKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayA/IHJlc3BvbnNlIDogUHJvbWlzZU9iai5yZWplY3QocmVzcG9uc2UpO1xuXG4gICAgfSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIGVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlT2JqLnJlamVjdChyZXNwb25zZSk7XG4gICAgfSk7XG59XG5cbkh0dHAub3B0aW9ucyA9IHt9O1xuXG5IdHRwLmhlYWRlcnMgPSB7XG4gICAgcHV0OiBKU09OX0NPTlRFTlRfVFlQRSxcbiAgICBwb3N0OiBKU09OX0NPTlRFTlRfVFlQRSxcbiAgICBwYXRjaDogSlNPTl9DT05URU5UX1RZUEUsXG4gICAgZGVsZXRlOiBKU09OX0NPTlRFTlRfVFlQRSxcbiAgICBjb21tb246IENPTU1PTl9IRUFERVJTLFxuICAgIGN1c3RvbToge31cbn07XG5cbkh0dHAuaW50ZXJjZXB0b3IgPSB7YmVmb3JlOiBiZWZvcmUsIG1ldGhvZDogbWV0aG9kLCBib2R5OiBib2R5LCBqc29ucDoganNvbnAsIGhlYWRlcjogaGVhZGVyLCBjb3JzOiBjb3JzfTtcbkh0dHAuaW50ZXJjZXB0b3JzID0gWydiZWZvcmUnLCAnbWV0aG9kJywgJ2JvZHknLCAnanNvbnAnLCAnaGVhZGVyJywgJ2NvcnMnXTtcblxuWydnZXQnLCAnZGVsZXRlJywgJ2hlYWQnLCAnanNvbnAnXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QkJDEpIHtcblxuICAgIEh0dHBbbWV0aG9kJCQxXSA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMkJDEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMoYXNzaWduKG9wdGlvbnMkJDEgfHwge30sIHt1cmw6IHVybCwgbWV0aG9kOiBtZXRob2QkJDF9KSk7XG4gICAgfTtcblxufSk7XG5cblsncG9zdCcsICdwdXQnLCAncGF0Y2gnXS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QkJDEpIHtcblxuICAgIEh0dHBbbWV0aG9kJCQxXSA9IGZ1bmN0aW9uICh1cmwsIGJvZHkkJDEsIG9wdGlvbnMkJDEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMoYXNzaWduKG9wdGlvbnMkJDEgfHwge30sIHt1cmw6IHVybCwgbWV0aG9kOiBtZXRob2QkJDEsIGJvZHk6IGJvZHkkJDF9KSk7XG4gICAgfTtcblxufSk7XG5cbi8qKlxuICogU2VydmljZSBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBSRVNUZnVsIHNlcnZpY2VzLlxuICovXG5cbmZ1bmN0aW9uIFJlc291cmNlKHVybCwgcGFyYW1zLCBhY3Rpb25zLCBvcHRpb25zJCQxKSB7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXMgfHwge30sIHJlc291cmNlID0ge307XG5cbiAgICBhY3Rpb25zID0gYXNzaWduKHt9LFxuICAgICAgICBSZXNvdXJjZS5hY3Rpb25zLFxuICAgICAgICBhY3Rpb25zXG4gICAgKTtcblxuICAgIGVhY2goYWN0aW9ucywgZnVuY3Rpb24gKGFjdGlvbiwgbmFtZSkge1xuXG4gICAgICAgIGFjdGlvbiA9IG1lcmdlKHt1cmw6IHVybCwgcGFyYW1zOiBhc3NpZ24oe30sIHBhcmFtcyl9LCBvcHRpb25zJCQxLCBhY3Rpb24pO1xuXG4gICAgICAgIHJlc291cmNlW25hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIChzZWxmLiRodHRwIHx8IEh0dHApKG9wdHMoYWN0aW9uLCBhcmd1bWVudHMpKTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXNvdXJjZTtcbn1cblxuZnVuY3Rpb24gb3B0cyhhY3Rpb24sIGFyZ3MpIHtcblxuICAgIHZhciBvcHRpb25zJCQxID0gYXNzaWduKHt9LCBhY3Rpb24pLCBwYXJhbXMgPSB7fSwgYm9keTtcblxuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblxuICAgICAgICBjYXNlIDI6XG5cbiAgICAgICAgICAgIHBhcmFtcyA9IGFyZ3NbMF07XG4gICAgICAgICAgICBib2R5ID0gYXJnc1sxXTtcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAxOlxuXG4gICAgICAgICAgICBpZiAoL14oUE9TVHxQVVR8UEFUQ0gpJC9pLnRlc3Qob3B0aW9ucyQkMS5tZXRob2QpKSB7XG4gICAgICAgICAgICAgICAgYm9keSA9IGFyZ3NbMF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmFtcyA9IGFyZ3NbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMDpcblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgICAgdGhyb3cgJ0V4cGVjdGVkIHVwIHRvIDIgYXJndW1lbnRzIFtwYXJhbXMsIGJvZHldLCBnb3QgJyArIGFyZ3MubGVuZ3RoICsgJyBhcmd1bWVudHMnO1xuICAgIH1cblxuICAgIG9wdGlvbnMkJDEuYm9keSA9IGJvZHk7XG4gICAgb3B0aW9ucyQkMS5wYXJhbXMgPSBhc3NpZ24oe30sIG9wdGlvbnMkJDEucGFyYW1zLCBwYXJhbXMpO1xuXG4gICAgcmV0dXJuIG9wdGlvbnMkJDE7XG59XG5cblJlc291cmNlLmFjdGlvbnMgPSB7XG5cbiAgICBnZXQ6IHttZXRob2Q6ICdHRVQnfSxcbiAgICBzYXZlOiB7bWV0aG9kOiAnUE9TVCd9LFxuICAgIHF1ZXJ5OiB7bWV0aG9kOiAnR0VUJ30sXG4gICAgdXBkYXRlOiB7bWV0aG9kOiAnUFVUJ30sXG4gICAgcmVtb3ZlOiB7bWV0aG9kOiAnREVMRVRFJ30sXG4gICAgZGVsZXRlOiB7bWV0aG9kOiAnREVMRVRFJ31cblxufTtcblxuLyoqXG4gKiBJbnN0YWxsIHBsdWdpbi5cbiAqL1xuXG5mdW5jdGlvbiBwbHVnaW4oVnVlKSB7XG5cbiAgICBpZiAocGx1Z2luLmluc3RhbGxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgVXRpbChWdWUpO1xuXG4gICAgVnVlLnVybCA9IFVybDtcbiAgICBWdWUuaHR0cCA9IEh0dHA7XG4gICAgVnVlLnJlc291cmNlID0gUmVzb3VyY2U7XG4gICAgVnVlLlByb21pc2UgPSBQcm9taXNlT2JqO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoVnVlLnByb3RvdHlwZSwge1xuXG4gICAgICAgICR1cmw6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zKFZ1ZS51cmwsIHRoaXMsIHRoaXMuJG9wdGlvbnMudXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAkaHR0cDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMoVnVlLmh0dHAsIHRoaXMsIHRoaXMuJG9wdGlvbnMuaHR0cCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgJHJlc291cmNlOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gVnVlLnJlc291cmNlLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgJHByb21pc2U6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChleGVjdXRvcikgeyByZXR1cm4gbmV3IFZ1ZS5Qcm9taXNlKGV4ZWN1dG9yLCB0aGlzJDEpOyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9KTtcbn1cblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5WdWUpIHtcbiAgICB3aW5kb3cuVnVlLnVzZShwbHVnaW4pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwbHVnaW47XG5leHBvcnQgeyBVcmwsIEh0dHAsIFJlc291cmNlIH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdnVlLXJlc291cmNlL2Rpc3QvdnVlLXJlc291cmNlLmVzMjAxNS5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(0)

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1))(2)

/***/ }),
/* 10 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);