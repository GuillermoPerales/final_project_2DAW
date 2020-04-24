<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use App\Traits\ApiResponser;
use Throwable;

class Handler extends ExceptionHandler {
    use ApiResponser;
    /**
    * A list of the exception types that are not reported.
    *
    * @var array
    */
    protected $dontReport = [
        //
    ];

    /**
    * A list of the inputs that are never flashed for validation exceptions.
    *
    * @var array
    */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
    * Report or log an exception.
    *
    * @param  \Throwable  $exception
    * @return void
    *
    * @throws \Exception
    */

    public function report( Throwable $exception ) {
        parent::report( $exception );
    }

    /**
    * Render an exception into an HTTP response.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \Throwable  $exception
    * @return \Symfony\Component\HttpFoundation\Response
    *
    * @throws \Throwable
    */

    public function render( $request, Throwable $exception ) {
        if ( $exception instanceof ValidationException ) {
            return $this->convertValidationExceptionToResponse( $exception, $request );
        }

        if ( $exception instanceof ModelNotFoundException ) {
            $model = class_basename( $exception->getModel() );
            return $this->errorResponse( " {$model} with this id not found", 404 );
        }

        if ( $exception instanceof AuthenticationException ) {
            return $this->unauthenticated( $request, $exception );
        }

        if ( $exception instanceof AuthorizationException ) {
            return $this->errorResponse( 'Not Authorized', 403 );
        }

        if ( $exception instanceof NotFoundHttpException ) {
            return $this->errorResponse( 'Url not Found', 404 );
        }

        if ( $exception instanceof MethodNotAllowedHttpException ) {
            return $this->errorResponse( 'Method not Allowed', 405 );
        }

        if ( $exception instanceof HttpException ) {
            return $this->errorResponse( $exception->getMessage(), $exception->getStatusCode() );
        }

 /*        if ( $exception instanceof QueryException ) {
            $code = $exception->errorInfo[1];
            if($code== 1451){
                return $this->errorResponse( 'You cannot delete the resource because it is related to another resource', 409 );
                }
        }
 */
        if(config('app.debug')){
            return parent::render( $request, $exception );
        }        
        return $this->errorResponse('Unexpected Error', 500);

    }
    /**
    * Convert an authentication exception into a response.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  \Illuminate\Auth\AuthenticationException  $exception
    * @return \Symfony\Component\HttpFoundation\Response
    */
    protected function unauthenticated( $request, AuthenticationException $exception ) {
        return $this->errorResponse( 'Unauthtenticated', 401 );
    }

    /**
    * Create a response object from the given validation exception.
    *
    * @param  \Illuminate\Validation\ValidationException  $e
    * @param  \Illuminate\Http\Request  $request
    * @return \Symfony\Component\HttpFoundation\Response
    */
    protected function convertValidationExceptionToResponse( ValidationException $e, $request ) {
        $errors = $e->validator->errors()->getMessages();

        return $this->errorResponse( $errors, 422 );
    }

}
