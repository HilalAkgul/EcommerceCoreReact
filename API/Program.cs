using API.Data;
using API.MiddleWare;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connectionString = builder.Configuration.GetConnectionString("AppDb");

builder.Services.AddDbContext<StoreContext>(db =>
 db.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
                   );
    
builder.Services.AddCors();
var app = builder.Build();


var scope=app.Services.CreateScope();
var context=scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger=scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

try{
    

context.Database.Migrate();
DbInitializer.Initialize(context);
}
catch(Exception ex){

    logger.LogError(ex,"Problem Migrating Data");
}



app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors(opt=>{
 opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
});
//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
