pkgs:
pkgs.mkShell {
  buildInputs = with pkgs; [
  ];
  shellHook = ''
    yarn hardhat test
  '';
}
