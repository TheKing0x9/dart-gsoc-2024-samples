import 'dart:ffi';
// import 'dart:io';

// import 'package:path/path.dart';
// import 'package:sample/ffi/native_gen.dart';

// class NativeWrapper {
//   static final NativeBindings _bindings =
//       //     //NativeBindings(DynamicLibrary.open(native.wasm));
//       NativeBindings(DynamicLibrary.process());

//   static int add(int a, int b) {
//     return _bindings.add(a, b);
//   }
// }

// // import 'dart:ffi' as ffi;

@Native<Int Function(Int, Int)>()
external int add(int a, int b);
