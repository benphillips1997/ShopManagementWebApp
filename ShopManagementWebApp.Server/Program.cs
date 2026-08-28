using Microsoft.AspNetCore.OpenApi;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi;
using ShopManagementWebApp.Server;
using ShopManagementWebApp.Server.Services;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<ShopManagementDbContext>();

builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IBasketService, BasketService>();
builder.Services.AddScoped<IOrderService, OrderService>();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi(options =>
{
    AddOpenApiOptions(ref options);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev", policy =>
    {
        policy.WithOrigins("https://localhost:59716")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactDev");

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();


void AddOpenApiOptions(ref OpenApiOptions options)
{
    options.AddSchemaTransformer((schema, context, cancellationToken) =>
    {
        if (schema.Properties is null || !context.JsonTypeInfo.Type.IsClass)
        {
            return Task.CompletedTask;
        }

        var nullabilityContext = new NullabilityInfoContext();

        foreach (var property in context.JsonTypeInfo.Type.GetProperties(BindingFlags.Public | BindingFlags.Instance))
        {
            var jsonName = char.ToLowerInvariant(property.Name[0]) + property.Name[1..];

            if (!schema.Properties.TryGetValue(jsonName, out var propertySchema))
                continue;

            if (propertySchema is not OpenApiSchema concreteSchema)
                continue;

            // Fix int/double showing as number|string
            var underlyingType = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;
            if (underlyingType == typeof(int))
            {
                concreteSchema.Type = JsonSchemaType.Integer;
            }
            else if (underlyingType == typeof(double))
            {
                concreteSchema.Type = JsonSchemaType.Number;
            }

            // Force "id" properties nullable — runs AFTER the type fix above, so nothing overwrites it
            if (string.Equals(property.Name, "id", StringComparison.OrdinalIgnoreCase))
            {
                concreteSchema.Type |= JsonSchemaType.Null;
                schema.Required?.Remove(jsonName);
                continue;
            }

            // Mark required if non-nullable
            var nullability = nullabilityContext.Create(property);
            if (nullability.WriteState != NullabilityState.Nullable)
            {
                schema.Required ??= new HashSet<string>();
                schema.Required.Add(jsonName);
            }
        }

        return Task.CompletedTask;
    });
}