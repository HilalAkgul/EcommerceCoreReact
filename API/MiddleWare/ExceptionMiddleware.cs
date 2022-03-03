using System.Text.Json;

namespace API.MiddleWare
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        public ILogger<ExceptionMiddleware> _logger { get; }
        private readonly IHostEnvironment _env;
        
        public ExceptionMiddleware(RequestDelegate next,ILogger<ExceptionMiddleware> logger,IHostEnvironment env)
        {
            this._env = env;
            this._logger = logger;
            this._next = next;
            
        }

        public async Task InvokeAsync(HttpContext context)
        {
try{
    await _next(context);
}
catch (Exception ex){
    _logger.LogError(ex,ex.Message);
    context.Response.ContentType="application";
    context.Response.StatusCode=500;

    var response=new ProblemDetails{

Status=500,
Detail=_env.IsDevelopment()?ex.StackTrace.ToString():null,

Title=ex.Message

    };
    var options=new JsonSerializerOptions{

        PropertyNamingPolicy=JsonNamingPolicy.CamelCase
    };

    var json=JsonSerializer.Serialize(response,options);
await context.Response.WriteAsync(json);

        }
    }
}}