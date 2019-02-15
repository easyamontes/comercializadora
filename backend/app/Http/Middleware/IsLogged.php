<?php

namespace App\Http\Middleware;
use App\Helpers\JwtAuth;
use App\Car;
use Closure;

class IsLogged
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $hash = $request->header('Authorization',null);
        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);
        if($checkToken){
            $user = $jwtAuth->checkToken($hash,true);
            $request->request->add(['userid' => $user->sub]);
            $request->request->add(['per' => $user->per]);
            return $next($request);
        }else{
            $data = array(
                'message' => 'Usuario no logeado',
                'code' => 400,
                'status' => 'error'
            );
            return response()->json($data,200);
        }
    }

}//End Class
 