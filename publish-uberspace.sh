git push
ionic cordova build android
scp platforms/android/build/outputs/apk/android-armv7-debug.apk jrg@deneb.uberspace.de:/home/jrg/html/mw/android-armv7-debug.apk
~/scripts/sendMail-apk-ready.sh

# add manual in config.xml -> <preference name="loadUrlTimeoutValue" value="700000" />