ZOEC = "../bin/zoec.exe"
METADPP = "../bin/metadppc.exe"

PUMASCRIPT_DEP = default.externs.zoe \
	pumascript.zoe \
	runtime.zoe

all : $(PUMASCRIPT_DEP)
	mkdir js-src & echo generate JS
	$(ZOEC) -ro -p:JavaScript -opath:js-src -pn:puma pumascript.zoe

%.zoe : %.dpp
	$(METADPP) -s $<

clean:
	del /s *.zoe & del /s .\js-src\*.*
