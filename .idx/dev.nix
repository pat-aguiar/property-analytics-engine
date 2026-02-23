{ pkgs, ... }: {
  channel = "stable-23.11"; # or "unstable"
  packages = [
    pkgs.nodejs_20
    pkgs.redis
  ];
  idx.extensions = [
    "dbaeumer.vscode-eslint"
  ];
  services.redis.enable = true;
}