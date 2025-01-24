# Evergore Userscripts

Evergore Map Downloader ist ein Userscript, das es im [Browsergame Evergore](https://evergore.de/) ermöglicht, die gesamte sichtbare Karte herunterzuladen. 

## Evergore Map Downloader
Ein Skript, um in der aktuellen Welt Lenoran die gesamte Karte herunterzuladen.

## Evergore Inventarbeschreibung ausklappen.
Im Inventar von Evergore haben (fast) alle Items eine ausklappbare Beschreibung. Mit diesem Skript lassen sich die Beschreibungen aller Items mit einem Klick auf einmal aus- und wieder einklappen.
Aktuell lassen sich vor dem ersten Klick auf den Button die Elemente noch einzeln ein- und ausklappen. Nach dem ersten Klick ist dies nicht mehr möglich, dann können nur noch alle auf einmal umgeschaltet werden.

## Banktransfer
Ein Button, der alle Rohstoffe, Handwerksmaterialien und alles Gold in das Inventar bzw. in die Bank bewegt.

## Avatare in Gruppenübersicht
Hiermit lassen sich die Avatare vor den Charakternamen anzeigen.

## Gruppenbericht filtern
Fügt dem Gruppenbericht einen Button hinzu, der die Nachricht so umgestaltet, dass oben die Anzahl der Kämpfe, Anzahl der gewonnen Kämpfe und die gefunden Pläne auflistet, und ausschließlich Kampfereignisse darstellt, dabei wird jeder in einer Zeile angezeigt mit dem Zusatz, ob der Kampf gewonnen oder verloren wurde und wie viele Runden er ging.

## Gildenrangliste nach Gesamtstufe
Da ich die Gildenrangliste mit Gesamtpunkte = 0 relativ witzlos finde (auch wenn ich die nachvollziehen kann, warum man das macht), ändert dieses Skript den Wert in den wenig aussagekräftigen Wert "Gesamtstufe", für den die Stufen aller Mitglieder addiert werden, und sortiert die Tabelle anschließend danach. **Gilt für alle Welten.**

## Alphabetische Gildenhalle
Sortiert **auf allen Welten** die Gilden in der Gildenhalle alphabetisch und nicht nach guild_id.

## Städterangliste nach Gebäuden
Sortiert die Städterangliste in allen Welten nach Anzahl der Gebäude und bei Gleichstand nach Anzahl der Einwohner.

## Map Checkbox Saver
Speichert den Value der Checkboxen im localStorage, damit die Werte erhalten bleiben.

## Marktbestand Export
Exportiert den Bestand des eigenen Marktstandes in eine CSV-Datei. Da automatische Seitenwechsel durch ein Skript nicht zulässig sind erfolgt bei einem Klick zum Starten des Skripts ein Wechsel auf die erste Seite des eigenen Marktstandes und man wird zum manuellen Wechsel der Seiten aufgefordert. Auf der letzten Seite gibt es dann einen Button zum Download der CSV-Datei. 

## Marktprotokoll Export
Ähnlich wie das Skript zum Export des Marktbestandes wird hier nichts automatisch ausgelesen sondern nur manuell je Seite, die aufgerufen wird. Anders als bei dem o.g. Skript kann der Export seitenweise erfolgen - das ganze Protokoll ist doch recht lang. Hierzu muss man einfach das Skript auf einer beliebigen Seite starten und kann dann entweder die Datei herunterladen oder die gespeicherten Daten zurücksetzen. Bei jedem Seitenwechsel werden die neuen Daten gespeichert, Duplikate werden dabei gelöscht. Wenn man mit der Auswahl zufrieden ist kann die Datei heruntergeladen werden.
