#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
ARG BUILD_CONFIG
WORKDIR /src
COPY ["MediaLibrary.WebUI/MediaLibrary.WebUI.csproj", "MediaLibrary.WebUI/"]
COPY ["MediaLibrary.BLL/MediaLibrary.BLL.csproj", "MediaLibrary.BLL/"]
COPY ["MediaLibrary.DAL/MediaLibrary.DAL.csproj", "MediaLibrary.DAL/"]
COPY ["MediaLibrary.Shared/MediaLibrary.Shared.csproj", "MediaLibrary.Shared/"]
RUN dotnet restore "MediaLibrary.WebUI/MediaLibrary.WebUI.csproj"
COPY . .
WORKDIR "/src/MediaLibrary.WebUI"
RUN apt-get update && apt-get -y install nodejs && apt-get -y install npm
RUN npm install typescript@4.5.4 -g
RUN npm install
RUN tsc --project "wwwroot/lib/app/tsconfig.json"
RUN dotnet build "MediaLibrary.WebUI.csproj" -c $BUILD_CONFIG -o /app/build

FROM build AS publish
RUN dotnet publish "MediaLibrary.WebUI.csproj" -c $BUILD_CONFIG -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY "/MediaLibrary.WebUI/wwwroot/lib/app/app.js" "wwwroot/lib/app/"
ENTRYPOINT ["dotnet", "MediaLibrary.WebUI.dll"]