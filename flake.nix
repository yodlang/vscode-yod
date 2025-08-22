# SPDX-FileCopyrightText: 2025 Milesime <213074881+milesime@users.noreply.github.com>
#
# SPDX-License-Identifier: GPL-2.0-only

{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs =
    { nixpkgs, ... }:
    let
      forAllSystems = f: with nixpkgs; lib.genAttrs lib.systems.flakeExposed (s: f legacyPackages.${s});
    in
    {
      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShellNoCC {
          packages = with pkgs; [
            nixd
            nixfmt-rfc-style
            prettierd
            marksman
            harper
            yaml-language-server
            just-lsp
            biome
            reuse
            bun
            just
            oxipng
            nodePackages.npm
          ];
        };
      });
    };
}
