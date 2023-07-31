while getopts s:v:m: flag
do
    case "${flag}" in
        s) server=${OPTARG};;
        v) runtime_version=${OPTARG};;
        m) update_message=${OPTARG};;
    esac
done

read -s -p "Password for $server: " SSHPASS 
export SSHPASS

timestamp=$(date +%s)
directory=$runtime_version"/"$timestamp

npx expo export --experimental-bundle

mkdir -p updates/$directory/

cp -r dist/* updates/$directory

node scripts/exportClientExpoConfig.js $update_message > updates/$directory/expoConfig.json

tmp=${directory//'('/'\('}
substituted_directory=${tmp//')'/'\)'}
sshpass -e ssh $server "mkdir -p ~/expo-updates-server/updates/$substituted_directory"

tar -C updates/$directory -cvf updates/$directory/update_pack.tar .

sshpass -e scp -r updates/$directory/update_pack.tar  $server:~/expo-updates-server/updates/$substituted_directory

sshpass -e ssh $server "tar -xvf ~/expo-updates-server/updates/$substituted_directory/update_pack.tar -C ~/expo-updates-server/updates/$substituted_directory && rm ~/expo-updates-server/updates/$substituted_directory/update_pack.tar "

unset SSHPASS
