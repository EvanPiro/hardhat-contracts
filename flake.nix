{
  description = "Dev shell sandbox";
  inputs = {
    nixpkgs.url = "github:EvanPiro/nixpkgs?rev=974474eb7d95a7caddc37eec2346ea96cb930913";
  };
  outputs = {
    self,
    nixpkgs,
  }: let
    # Add supported systems
    systems = ["x86_64-darwin" "x86_64-linux"];
    mkDevShell = import ./shell.nix;
  in
    nixpkgs.lib.pipe systems [
      (builtins.map (system: let
        pkgs = nixpkgs.legacyPackages.${system}.pkgs;
      in {
        # Add set conforming to flake schema here:
        devShells.${system}.default = mkDevShell pkgs;
        formatter.${system} = pkgs.alejandra;
        packages.${system}.default = with pkgs; mkYarnPackage {
          name = "tests";
          src = ./.;
          packageJSON = ./package.json;
          yarnLock = ./yarn.lock;
          yarnPostBuild = ''
            ${yarn}/bin/yarn hardhat test
          '';
        };
      }))

      (builtins.foldl' nixpkgs.lib.recursiveUpdate {})
    ];
}
