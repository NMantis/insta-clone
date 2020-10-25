<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Validator;
Use Illuminate\Support\Facades\Storage;
Use Carbon\Carbon;
class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::paginate(10);

        return response()->json([
            "posts" => $posts
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'string',
            'description' => 'string',
            'location' => 'string',
        ]);
        if($validator->fails()){
            return response()->json([
                'error' => $validator->errors(),
                'Validation Error'
            ],422);
        }

        if (!preg_match('/^data:image\/(\w+);base64,/', $request->image)) {
            return response()->json([
                'error' => "Wrong media format",
                'Validation Error'
            ],422);
        }

        $imageFile = substr( $request->image, strpos($request->image, ',') + 1);
        $imageFile = base64_decode($imageFile);
        $fileName = Carbon::now()->timestamp.".png";
        Storage::disk('local')->put("public/".$fileName, $imageFile);

        $post = Post::create([
            'description' => $request->description ?? null,
            'image' =>  Storage::url($fileName),// storage/1603633617.png
            'location' =>  $request->location ?? null,
            'user_id' => auth()->user()->id
        ]);

        return response()->json([
            "message" => "Post successfully uploaded"
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $post = Post::where([
            ['user_id', '=', auth()->user()->id],
            ['id', '=', $request->id]
        ])->firstOrFail();
        
      //  dd($post->image);

        if(Storage::exists($post->image)) {
            Storage::delete($post->image);
        }

        $post->delete();

        return response()->json(['message' => 'ok']);
    }
}
