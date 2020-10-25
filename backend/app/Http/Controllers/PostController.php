<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Validator;
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
       // dd($request);
        $user_id = auth()->user()->id;


        $validator = Validator::make($request->all(), [ 
            'image' => 'required|mimes:png,jpg',
            'description' => 'string',
            'location' => 'string',
        ]); 

        if($validator->fails()){
            return response([
                'error' => $validator->errors(), 
                'Validation Error'
            ]);
        }

        if ($images = $request->file('image')) {
            //store file into document folder
            $images = $request->image->store('public');
 
            //store your file into database
            $post = Post::create([
                'description' => $request->description,
                'image' =>  $request->image,
                'location' =>  $request->location,
                'user_id' => $user_id
            ]);
              
            return response()->json([
                "message" => "Post successfully uploaded"
            ]);
  
        }
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
    public function destroy(Post $post)
    {
        //
    }
}
