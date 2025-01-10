# Evergore Map Downloader

Evergore Map Downloader ist ein Userscript, das es im [Browsergame Evergore](https://evergore.de/) ermöglicht die gesamte sichtbare Karte herunterzuladen. 

### Was ist das Problem?
In früheren Welten war das in den meisten Browsern über einen einfachen Rechtsklick möglich. In der aktuellen Welt Lenoran wurde die Karte allerdings überarbeitet (und hübscher gemacht) und offensichtlich auch die Art, wie die Karte in die Seite eingebunden wird geändert, so dass die einfache Variante nicht mehr funktioniert. Mit der alten Variante wird nur ein Layer gespeichert, der den aktuellen Standort und die geplante Route anzeigt, die auf transparenten Hintergrund liegt.

Ich habe daher erstmal etwas mit den DevTools von Chrome und Safari rumgespielt, um halbwegs zu verstehen, wie die Karte eingebunden ist, und wie ggf. wieder ein Export bzw. Abspeichern der gesamten sichtbaren Karte möglich ist. Es geht also nur um die Karte, die selbst erkundet wurde und kein "Cheating", um Teile der Karte aufzudecken, die noch nicht bekannt sind.

### "Technischer" Hintergrund
Da ich selbst ein ziemlicher Laie bin gibt's in der Überschrift bewusst Anführungszeichen, denn so richtig tief kann ich in die Materie nicht einsteigen. 
Die Karte selber wird im Quelltext im div "mapDisplay" eingebunden. Für dieses div wird eine Breite von 2064px festgelegt und je nach Zoomstufe eine Höhe von 440px bis 5280px, der Standardwert beim Aufruf der Seite sind 2640px. 
Innerhalb des div gibt es die drei Schichten der Karte, die als <canvas> eingebaut sind. Diese haben eine feste Höhe von 550 (Angabe ohne px), und eine je nach Größe des Browserfensters variierende Weite. Diese Werte stellen den angezeigten Bereich dar, und diese Größe hat dann auch die per Rechtsklick gespeicherte Datei. Die oberste Ebene stellt das <canvas> mit der ID "canvas" dar. Darauf wird nur die aktuelle Position (der rote Kreis), die Reiseroute (die gestrichtelte Linie) und das Ziel (das rote X) dargestellt. Darüber liegt "veilCanvas", der Fog of War, also der Nebel, der über den Feldern liegt, die sich nicht im sichtbaren Bereich liegen oder kürzlich bereist wurden. Die Karte selbst - "mapCanvas" - stellt die unterste Ebene dar. 
Wenn man "canvas" und "veilCanvas" ausblendet lässt sich per Rechtsklick "mapCanvas" abspeichern, aber nur in der angegebenen Größe, also nur ein kleiner Ausschnitt. Vergrößert man die Werte von allen drei <canvas> auf die Werte des div bekommt man eine große Bilddatei... mit nur dem kleinen sichtbaren Bereich irgendwo in der Ecke...

tbc
