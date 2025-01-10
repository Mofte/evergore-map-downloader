# Evergore Map Downloader

Evergore Map Downloader ist ein Userscript, das es im [Browsergame Evergore](https://evergore.de/) ermöglicht, die gesamte sichtbare Karte herunterzuladen. 

## Was ist das Problem?
In früheren Welten war das in den meisten Browsern über einen einfachen Rechtsklick möglich. In der aktuellen Welt Lenoran wurde die Karte allerdings überarbeitet (und hübscher gemacht) und offensichtlich auch die Art, wie die Karte in die Seite eingebunden wird geändert, so dass die einfache Variante nicht mehr funktioniert. Mit der alten Variante wird nur ein Layer gespeichert, der den aktuellen Standort und die geplante Route anzeigt, die auf transparenten Hintergrund liegt.

Ich habe daher erstmal etwas mit den DevTools von Chrome und Safari rumgespielt, um halbwegs zu verstehen, wie die Karte eingebunden ist, und wie ggf. wieder ein Export bzw. Abspeichern der gesamten sichtbaren Karte möglich ist. Es geht also nur um die Karte, die selbst erkundet wurde und kein "Cheating", um Teile der Karte aufzudecken, die noch nicht bekannt sind.

## "Technischer" Hintergrund
Da ich selbst ein ziemlicher Laie bin gibt's in der Überschrift bewusst Anführungszeichen, denn so richtig tief kann ich in die Materie nicht einsteigen. 
Die Karte selber wird im Quelltext im div 'mapDisplay' eingebunden. Für dieses div wird eine Breite von 2064px festgelegt und je nach Zoomstufe eine Höhe von 440px bis 5280px, der Standardwert beim Aufruf der Seite sind 2640px. 
Innerhalb des div gibt es die drei Schichten der Karte, die als <canvas> eingebaut sind. Diese haben eine feste Höhe von 550 (Angabe ohne px), und eine je nach Größe des Browserfensters variierende Weite. Diese Werte stellen den angezeigten Bereich dar, und diese Größe hat dann auch die per Rechtsklick gespeicherte Datei. Die oberste Ebene stellt das <canvas> mit der ID 'canvas' dar. Darauf wird nur die aktuelle Position (der rote Kreis), die Reiseroute (die gestrichtelte Linie) und das Ziel (das rote X) dargestellt. Darüber liegt 'veilCanvas', der Fog of War, also der Nebel, der über den Feldern liegt, die sich nicht im sichtbaren Bereich liegen oder kürzlich bereist wurden. Die Karte selbst - 'mapCanvas' - stellt die unterste Ebene dar. 
Wenn man 'canvas' und 'veilCanvas' ausblendet lässt sich per Rechtsklick 'mapCanvas' abspeichern, aber nur in der angegebenen Größe, also nur ein kleiner Ausschnitt. Vergrößert man die Werte von allen drei <canvas> auf die Werte des div bekommt man eine große Bilddatei... mit nur dem kleinen sichtbaren Bereich irgendwo in der Ecke...

Hierfür ist das CSS der Seite verantwortlich, konkret die 'scoped.css'. Hier wird bei dem Objekt(?) '#CONT_BODY #mapDisplay' die maximale Größe des Kartenfensters und des Canvas über die folgenden beiden Werte(?) festgelegt: 'max-width: calc(100% - 170px);' (Zeile 329) und 'max-height: 550px;' (Zeile 339). Deaktiviert man diese beiden wird die Größe nicht mehr limitiert. 

Damit die Änderungen "aktiv" sind muss man dann noch einmal den Neuaufbau der Karte triggern, dafür reicht ein einfaches, minimales Zoomen. 

Danach lässt sich die gesamte sichtbare Karte per Rechtsklick speichern. \o/

## Das Skript
Da ich - wie schon erwähnt - eher nicht so technisch versiert bin habe ich mir für die Programmierung Unterstützung geholt; von ChatGPT. Da ich nun wusste, welche Änderungen vorzunehmen sind habe ich das Stück für Stück vornehmen lassen. Hier die einzelnen Komponenten des Skripts:

### function styleButton
Ganz simpel: ich wollte Buttons (welche wird gleich erklärt), und die sollten zur Seite passen, also habe ich das th.png aus dem komo-Grafikpaket genutzt. Der Rest sind Details.

### function activateCheckboxes
Für meinen Zweck möchte ich die Feldstufen angezeigt haben. Damit man nach dem Aufbau der Karte nicht umständlich nach unten scrollen muss oder vorab dran denken muss übernimmt das Skript das Anhaken der Checkboxen (das für die topographische Ansicht hat sich vmtl. durch das Ausblenden des 'veilCanvas' erledigt, aber sicher ist sicher). Damit die Änderung auch bei der Karte berücksichtigt wird, wird ein change-Event getriggert.

### function adjustCanvas
Diese Funktion übernimmt die Anpassung der width und height Werte sowie das Ausblenden von 'mapCanvas' und 'veilCanvas'. 

### function deactivateCSS
Nimmt die Deaktivierung der erwähnten CSS-Werte aus 'scoped.css' vor: 'max-width: calc(100% - 170px);' (Zeile 329) und 'max-height: 550px;'.

### function simulateZoom
Simuliert das für den Neuaufbau der Karte erforderlichen Zoomen.

### function addButtons
Ziemlich genau die Hälfte des Codes nimmt diese Funktion ein, oder eher eine "Funktionskiste". 
Da die Karte nach den Anpassungen nicht wirklich funktional ist, wollte ich nicht, dass das Skript dauerhaft aktiv ist. Deshalb wurde der erste Button notwendig: "Skript zum Herunterladen starten". Dies ist der einzige Button der am Anfang sichtbar ist und er triggert onClick die Funktion. Auch hier ein altes Relikt: in 'onStartClick' gibt es ein Timeout von einer Sekunde, da bevor der Button da war, das Skript nicht direkt beim Aufbau der Seite laufen durfte, da es sonst nicht funktioniert hat. In der onClick Funktion werden also alle Funktionen ausgeführt, der Button versteckt und die folgenden drei eingeblendet: 'Karte in neuem Tab öffnen', 'Karte herunterladen' und 'Skript beenden'.
Die ersten beiden sind zur Vereinfachung, da der Aufbau der Seite durch das Skript zerschossen wird und gerade auf Mobilgeräten der "Rechtsklick" schwierig werden dürfte. Mit den beiden Knöpfen aber kein Problem. Für den letzten Button hatte ich erst überlegt, ChatGPT Code schreiben zu lassen, der alles wieder zurücksetzt, aber dann ist mir doch eine einfachere Variante eingefallen: ein stumpfer Reload der Seite.

## La fin
Ich bin bisher recht angetan von dem Skript, lasse das noch von Haudrauf absegnen und werde dann noch einen Wiki-Artikel dazu verfassen, und es dann auf Version 1.0 setzen. (Falls jemand bis hierher gelesen hat:) Ich freue mich über Feedback, sei es zu Funktionen, die noch sinnig wären, oder zum Inhalt/Aufbau des Codes, der wie gesagt überwiegend durch KI erzeugt wurde. Ein paar TODOs habe ich unten schon aufgelistet, ich nehme aber gerne noch mehr dazu.

## TODO
- Sicherstellen, dass die width und height-Werte des div konstant sind und sich nicht ändern. Ggf. nicht mit absoluten Werten arbeiten.
- Feld zum ein- und ausblenden der Feldstufen
- simulateZoom zoomt nur raus, prüfen, ob sich hierdurch der Kartenausschnitt ungünstig ändert
- Reihenfolge in der onStartClick Funktion und Timeout notwendig?
