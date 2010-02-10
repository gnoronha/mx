#!/usr/bin/env gjs
/*
 * Copyright 2010 Intel Corporation.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms and conditions of the GNU Lesser General Public License,
 * version 2.1, as published by the Free Software Foundation.
 *
 * This program is distributed in the hope it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for
 * more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St - Fifth Floor, Boston, MA 02110-1301 USA.
 * Boston, MA 02111-1307, USA.
 *
 */

const Clutter = imports.gi.Clutter;
const Mx = imports.gi.Mx;

Clutter.init (0, null);

let stage = Clutter.Stage.get_default ();
stage.title = "Test Path Bar"
let focus_man = new Mx.FocusManager ({stage: stage});

let vbox = new Mx.BoxLayout ();
vbox.set_vertical (true);
stage.add_actor (vbox);
vbox.set_width (stage.width);

let bar = new Mx.PathBar ();
vbox.add_actor (bar);
vbox.child_set_property (bar, "x-align", 0);
vbox.child_set_property (bar, "x-fill", false);

let hbox = new Mx.BoxLayout ();
vbox.add_actor (hbox);

let push_button = new Mx.Button ( {label: "Add crumb"} )
hbox.add_actor (push_button);

let pop_button = new Mx.Button ( {label: "Remove crumb"} );
hbox.add_actor (pop_button);

let editable_button = new Mx.Button ( {label: "Toggle editable"} );
hbox.add_actor (editable_button);

let rename_button = new Mx.Button ( {label: "Re-label 1st button"} );
hbox.add_actor (rename_button);

push_button.connect ("clicked",
                     function (b) {
                       bar.push ("Crumb" + (bar.level + 1));
                     });

pop_button.connect ("clicked",
                    function (b) {
                      bar.pop ();
                    });

editable_button.connect ("clicked",
                         function (b) {
                           bar.editable = !bar.editable;
                           vbox.child_set_property (bar, "expand", bar.editable);
                           vbox.child_set_property (bar, "x-fill", bar.editable);
                         });

rename_button.connect ("clicked",
                       function (b) {
                         bar.set_label (1, bar.get_text ());
                       });

stage.show ();
Clutter.main ();

stage.destroy ();