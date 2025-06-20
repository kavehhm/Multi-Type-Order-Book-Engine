// source: orderbook.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

goog.exportSymbol('proto.orderbook.AddOrderRequest', null, global);
goog.exportSymbol('proto.orderbook.CancelOrderRequest', null, global);
goog.exportSymbol('proto.orderbook.GetOrderBookRequest', null, global);
goog.exportSymbol('proto.orderbook.OrderBookResponse', null, global);
goog.exportSymbol('proto.orderbook.OrderResponse', null, global);
goog.exportSymbol('proto.orderbook.PriceLevel', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.orderbook.AddOrderRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.orderbook.AddOrderRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.orderbook.AddOrderRequest.displayName = 'proto.orderbook.AddOrderRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.orderbook.CancelOrderRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.orderbook.CancelOrderRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.orderbook.CancelOrderRequest.displayName = 'proto.orderbook.CancelOrderRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.orderbook.GetOrderBookRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.orderbook.GetOrderBookRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.orderbook.GetOrderBookRequest.displayName = 'proto.orderbook.GetOrderBookRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.orderbook.OrderResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.orderbook.OrderResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.orderbook.OrderResponse.displayName = 'proto.orderbook.OrderResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.orderbook.OrderBookResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.orderbook.OrderBookResponse.repeatedFields_, null);
};
goog.inherits(proto.orderbook.OrderBookResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.orderbook.OrderBookResponse.displayName = 'proto.orderbook.OrderBookResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.orderbook.PriceLevel = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.orderbook.PriceLevel, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.orderbook.PriceLevel.displayName = 'proto.orderbook.PriceLevel';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.orderbook.AddOrderRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.orderbook.AddOrderRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.orderbook.AddOrderRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orderbook.AddOrderRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
orderId: jspb.Message.getFieldWithDefault(msg, 1, 0),
side: jspb.Message.getFieldWithDefault(msg, 2, ""),
price: jspb.Message.getFloatingPointFieldWithDefault(msg, 3, 0.0),
quantity: jspb.Message.getFieldWithDefault(msg, 4, 0),
orderType: jspb.Message.getFieldWithDefault(msg, 5, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.orderbook.AddOrderRequest}
 */
proto.orderbook.AddOrderRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.orderbook.AddOrderRequest;
  return proto.orderbook.AddOrderRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.orderbook.AddOrderRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.orderbook.AddOrderRequest}
 */
proto.orderbook.AddOrderRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setOrderId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSide(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setPrice(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setQuantity(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setOrderType(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.orderbook.AddOrderRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.orderbook.AddOrderRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.orderbook.AddOrderRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orderbook.AddOrderRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOrderId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getSide();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getPrice();
  if (f !== 0.0) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getQuantity();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getOrderType();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional int32 order_id = 1;
 * @return {number}
 */
proto.orderbook.AddOrderRequest.prototype.getOrderId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.orderbook.AddOrderRequest} returns this
 */
proto.orderbook.AddOrderRequest.prototype.setOrderId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string side = 2;
 * @return {string}
 */
proto.orderbook.AddOrderRequest.prototype.getSide = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.orderbook.AddOrderRequest} returns this
 */
proto.orderbook.AddOrderRequest.prototype.setSide = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional double price = 3;
 * @return {number}
 */
proto.orderbook.AddOrderRequest.prototype.getPrice = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 3, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.orderbook.AddOrderRequest} returns this
 */
proto.orderbook.AddOrderRequest.prototype.setPrice = function(value) {
  return jspb.Message.setProto3FloatField(this, 3, value);
};


/**
 * optional int32 quantity = 4;
 * @return {number}
 */
proto.orderbook.AddOrderRequest.prototype.getQuantity = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.orderbook.AddOrderRequest} returns this
 */
proto.orderbook.AddOrderRequest.prototype.setQuantity = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional string order_type = 5;
 * @return {string}
 */
proto.orderbook.AddOrderRequest.prototype.getOrderType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.orderbook.AddOrderRequest} returns this
 */
proto.orderbook.AddOrderRequest.prototype.setOrderType = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.orderbook.CancelOrderRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.orderbook.CancelOrderRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.orderbook.CancelOrderRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orderbook.CancelOrderRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
orderId: jspb.Message.getFieldWithDefault(msg, 1, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.orderbook.CancelOrderRequest}
 */
proto.orderbook.CancelOrderRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.orderbook.CancelOrderRequest;
  return proto.orderbook.CancelOrderRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.orderbook.CancelOrderRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.orderbook.CancelOrderRequest}
 */
proto.orderbook.CancelOrderRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setOrderId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.orderbook.CancelOrderRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.orderbook.CancelOrderRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.orderbook.CancelOrderRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orderbook.CancelOrderRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOrderId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
};


/**
 * optional int32 order_id = 1;
 * @return {number}
 */
proto.orderbook.CancelOrderRequest.prototype.getOrderId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.orderbook.CancelOrderRequest} returns this
 */
proto.orderbook.CancelOrderRequest.prototype.setOrderId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.orderbook.GetOrderBookRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.orderbook.GetOrderBookRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.orderbook.GetOrderBookRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orderbook.GetOrderBookRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.orderbook.GetOrderBookRequest}
 */
proto.orderbook.GetOrderBookRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.orderbook.GetOrderBookRequest;
  return proto.orderbook.GetOrderBookRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.orderbook.GetOrderBookRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.orderbook.GetOrderBookRequest}
 */
proto.orderbook.GetOrderBookRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.orderbook.GetOrderBookRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.orderbook.GetOrderBookRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.orderbook.GetOrderBookRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orderbook.GetOrderBookRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.orderbook.OrderResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.orderbook.OrderResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.orderbook.OrderResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orderbook.OrderResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
message: jspb.Message.getFieldWithDefault(msg, 1, ""),
success: jspb.Message.getBooleanFieldWithDefault(msg, 2, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.orderbook.OrderResponse}
 */
proto.orderbook.OrderResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.orderbook.OrderResponse;
  return proto.orderbook.OrderResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.orderbook.OrderResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.orderbook.OrderResponse}
 */
proto.orderbook.OrderResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.orderbook.OrderResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.orderbook.OrderResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.orderbook.OrderResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orderbook.OrderResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
};


/**
 * optional string message = 1;
 * @return {string}
 */
proto.orderbook.OrderResponse.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.orderbook.OrderResponse} returns this
 */
proto.orderbook.OrderResponse.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool success = 2;
 * @return {boolean}
 */
proto.orderbook.OrderResponse.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.orderbook.OrderResponse} returns this
 */
proto.orderbook.OrderResponse.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.orderbook.OrderBookResponse.repeatedFields_ = [1,2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.orderbook.OrderBookResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.orderbook.OrderBookResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.orderbook.OrderBookResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orderbook.OrderBookResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
bidsList: jspb.Message.toObjectList(msg.getBidsList(),
    proto.orderbook.PriceLevel.toObject, includeInstance),
asksList: jspb.Message.toObjectList(msg.getAsksList(),
    proto.orderbook.PriceLevel.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.orderbook.OrderBookResponse}
 */
proto.orderbook.OrderBookResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.orderbook.OrderBookResponse;
  return proto.orderbook.OrderBookResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.orderbook.OrderBookResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.orderbook.OrderBookResponse}
 */
proto.orderbook.OrderBookResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.orderbook.PriceLevel;
      reader.readMessage(value,proto.orderbook.PriceLevel.deserializeBinaryFromReader);
      msg.addBids(value);
      break;
    case 2:
      var value = new proto.orderbook.PriceLevel;
      reader.readMessage(value,proto.orderbook.PriceLevel.deserializeBinaryFromReader);
      msg.addAsks(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.orderbook.OrderBookResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.orderbook.OrderBookResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.orderbook.OrderBookResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orderbook.OrderBookResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBidsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.orderbook.PriceLevel.serializeBinaryToWriter
    );
  }
  f = message.getAsksList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.orderbook.PriceLevel.serializeBinaryToWriter
    );
  }
};


/**
 * repeated PriceLevel bids = 1;
 * @return {!Array<!proto.orderbook.PriceLevel>}
 */
proto.orderbook.OrderBookResponse.prototype.getBidsList = function() {
  return /** @type{!Array<!proto.orderbook.PriceLevel>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.orderbook.PriceLevel, 1));
};


/**
 * @param {!Array<!proto.orderbook.PriceLevel>} value
 * @return {!proto.orderbook.OrderBookResponse} returns this
*/
proto.orderbook.OrderBookResponse.prototype.setBidsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.orderbook.PriceLevel=} opt_value
 * @param {number=} opt_index
 * @return {!proto.orderbook.PriceLevel}
 */
proto.orderbook.OrderBookResponse.prototype.addBids = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.orderbook.PriceLevel, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.orderbook.OrderBookResponse} returns this
 */
proto.orderbook.OrderBookResponse.prototype.clearBidsList = function() {
  return this.setBidsList([]);
};


/**
 * repeated PriceLevel asks = 2;
 * @return {!Array<!proto.orderbook.PriceLevel>}
 */
proto.orderbook.OrderBookResponse.prototype.getAsksList = function() {
  return /** @type{!Array<!proto.orderbook.PriceLevel>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.orderbook.PriceLevel, 2));
};


/**
 * @param {!Array<!proto.orderbook.PriceLevel>} value
 * @return {!proto.orderbook.OrderBookResponse} returns this
*/
proto.orderbook.OrderBookResponse.prototype.setAsksList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.orderbook.PriceLevel=} opt_value
 * @param {number=} opt_index
 * @return {!proto.orderbook.PriceLevel}
 */
proto.orderbook.OrderBookResponse.prototype.addAsks = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.orderbook.PriceLevel, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.orderbook.OrderBookResponse} returns this
 */
proto.orderbook.OrderBookResponse.prototype.clearAsksList = function() {
  return this.setAsksList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.orderbook.PriceLevel.prototype.toObject = function(opt_includeInstance) {
  return proto.orderbook.PriceLevel.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.orderbook.PriceLevel} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orderbook.PriceLevel.toObject = function(includeInstance, msg) {
  var f, obj = {
price: jspb.Message.getFloatingPointFieldWithDefault(msg, 1, 0.0),
quantity: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.orderbook.PriceLevel}
 */
proto.orderbook.PriceLevel.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.orderbook.PriceLevel;
  return proto.orderbook.PriceLevel.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.orderbook.PriceLevel} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.orderbook.PriceLevel}
 */
proto.orderbook.PriceLevel.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setPrice(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setQuantity(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.orderbook.PriceLevel.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.orderbook.PriceLevel.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.orderbook.PriceLevel} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.orderbook.PriceLevel.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPrice();
  if (f !== 0.0) {
    writer.writeDouble(
      1,
      f
    );
  }
  f = message.getQuantity();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional double price = 1;
 * @return {number}
 */
proto.orderbook.PriceLevel.prototype.getPrice = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 1, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.orderbook.PriceLevel} returns this
 */
proto.orderbook.PriceLevel.prototype.setPrice = function(value) {
  return jspb.Message.setProto3FloatField(this, 1, value);
};


/**
 * optional int32 quantity = 2;
 * @return {number}
 */
proto.orderbook.PriceLevel.prototype.getQuantity = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.orderbook.PriceLevel} returns this
 */
proto.orderbook.PriceLevel.prototype.setQuantity = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


goog.object.extend(exports, proto.orderbook);
