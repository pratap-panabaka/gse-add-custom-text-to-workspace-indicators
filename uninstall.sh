#! /bin/bash
set -e

NAME=AddCustomTextToWorkSpaceIndicators
DOMAIN=pratap.fastmail.fm
UUID=$NAME@$DOMAIN

echo -e "\n\n\t~~~~~~~~~~~~~~~~ Add Custom Text To Workspace Indicators ~~~~~~~~~~~~~~~~\n"
echo -e "\trunning the script...\n"

if $(gnome-extensions list | grep -q $UUID); then
    gnome-extensions uninstall $UUID
else
    echo -e "\tAdd Custom Text To Workspace Indicators is not installed, exiting..."
    echo -e "\n\t~~~~~~~~~~~~~~~~~~ Thank You ~~~~~~~~~~~~~~~~~~\n\n"
    exit 1
fi

echo -e "\t------------------------------------------
\t| Add Custom Text To Workspace Indicators is uninstalled |
\t------------------------------------------"

echo -e "\n\t~~~~~~~~~~~~~~~~~~ Thank You ~~~~~~~~~~~~~~~~~~\n\n"
exit 0
