{
  inputs.dream2nix.url = "github:nix-community/dream2nix";
  outputs = {self, dream2nix}:
    (dream2nix.lib.makeFlakeOutputs {
      systemsFromFile = ./nix_systems;
      config.projectRoot = ./.;
      source = ./.;
      projects = ./projects.toml;
    }) // {
      checks = self.packages;
    };
}
