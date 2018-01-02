/*
 * Copyright (C) 2011-2014 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * This file is auto-generated. DO NOT MODIFY!
 * The source Renderscript file: /Users/raghavendrathavva/PartnersCode/temp/AppFactoryTest/build/luaandroid/dist/AppFactoryTest/src/com/konylabs/rs/Convolve.rs
 */

package com.konylabs.rs;

import android.support.v8.renderscript.*;
import android.content.res.Resources;

/**
 * @hide
 */
public class ScriptC_Convolve extends ScriptC {
    private static final String __rs_resource_name = "convolve";
    // Constructor
    public  ScriptC_Convolve(RenderScript rs) {
        this(rs,
             rs.getApplicationContext().getResources(),
             rs.getApplicationContext().getResources().getIdentifier(
                 __rs_resource_name, "raw",
                 rs.getApplicationContext().getPackageName()));
    }

    public  ScriptC_Convolve(RenderScript rs, Resources resources, int id) {
        super(rs, resources, id);
        __ALLOCATION = Element.ALLOCATION(rs);
        __U32 = Element.U32(rs);
        __I32 = Element.I32(rs);
        __U8_4 = Element.U8_4(rs);
    }

    private Element __ALLOCATION;
    private Element __I32;
    private Element __U32;
    private Element __U8_4;
    private FieldPacker __rs_fp_ALLOCATION;
    private FieldPacker __rs_fp_I32;
    private FieldPacker __rs_fp_U32;
    private final static int mExportVarIdx_pixelAlloc = 0;
    private Allocation mExportVar_pixelAlloc;
    public synchronized void set_pixelAlloc(Allocation v) {
        setVar(mExportVarIdx_pixelAlloc, v);
        mExportVar_pixelAlloc = v;
    }

    public Allocation get_pixelAlloc() {
        return mExportVar_pixelAlloc;
    }

    public Script.FieldID getFieldID_pixelAlloc() {
        return createFieldID(mExportVarIdx_pixelAlloc, null);
    }

    private final static int mExportVarIdx_indices = 1;
    private Allocation mExportVar_indices;
    public synchronized void set_indices(Allocation v) {
        setVar(mExportVarIdx_indices, v);
        mExportVar_indices = v;
    }

    public Allocation get_indices() {
        return mExportVar_indices;
    }

    public Script.FieldID getFieldID_indices() {
        return createFieldID(mExportVarIdx_indices, null);
    }

    private final static int mExportVarIdx_width = 2;
    private long mExportVar_width;
    public synchronized void set_width(long v) {
        if (__rs_fp_U32!= null) {
            __rs_fp_U32.reset();
        } else {
            __rs_fp_U32 = new FieldPacker(4);
        }
        __rs_fp_U32.addU32(v);
        setVar(mExportVarIdx_width, __rs_fp_U32);
        mExportVar_width = v;
    }

    public long get_width() {
        return mExportVar_width;
    }

    public Script.FieldID getFieldID_width() {
        return createFieldID(mExportVarIdx_width, null);
    }

    private final static int mExportVarIdx_height = 3;
    private long mExportVar_height;
    public synchronized void set_height(long v) {
        if (__rs_fp_U32!= null) {
            __rs_fp_U32.reset();
        } else {
            __rs_fp_U32 = new FieldPacker(4);
        }
        __rs_fp_U32.addU32(v);
        setVar(mExportVarIdx_height, __rs_fp_U32);
        mExportVar_height = v;
    }

    public long get_height() {
        return mExportVar_height;
    }

    public Script.FieldID getFieldID_height() {
        return createFieldID(mExportVarIdx_height, null);
    }

    private final static int mExportVarIdx_radius = 4;
    private int mExportVar_radius;
    public synchronized void set_radius(int v) {
        setVar(mExportVarIdx_radius, v);
        mExportVar_radius = v;
    }

    public int get_radius() {
        return mExportVar_radius;
    }

    public Script.FieldID getFieldID_radius() {
        return createFieldID(mExportVarIdx_radius, null);
    }

    private final static int mExportForEachIdx_root = 0;
    public Script.KernelID getKernelID_root() {
        return createKernelID(mExportForEachIdx_root, 3, null, null);
    }

    public void forEach_root(Allocation ain, Allocation aout) {
        forEach_root(ain, aout, null);
    }

    public void forEach_root(Allocation ain, Allocation aout, Script.LaunchOptions sc) {
        // check ain
        if (!ain.getType().getElement().isCompatible(__U32)) {
            throw new RSRuntimeException("Type mismatch with U32!");
        }
        // check aout
        if (!aout.getType().getElement().isCompatible(__U8_4)) {
            throw new RSRuntimeException("Type mismatch with U8_4!");
        }
        Type t0, t1;        // Verify dimensions
        t0 = ain.getType();
        t1 = aout.getType();
        if ((t0.getCount() != t1.getCount()) ||
            (t0.getX() != t1.getX()) ||
            (t0.getY() != t1.getY()) ||
            (t0.getZ() != t1.getZ()) ||
            (t0.hasFaces()   != t1.hasFaces()) ||
            (t0.hasMipmaps() != t1.hasMipmaps())) {
            throw new RSRuntimeException("Dimension mismatch between parameters ain and aout!");
        }

        forEach(mExportForEachIdx_root, ain, aout, null, sc);
    }

}

