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
 * The source Renderscript file: /Users/raghavendrathavva/PartnersCode/temp/AppFactoryTest/build/luaandroid/dist/AppFactoryTest/src/com/konylabs/rs/ColorClamp.rs
 */

package com.konylabs.rs;

import android.support.v8.renderscript.*;
import android.content.res.Resources;

/**
 * @hide
 */
public class ScriptC_ColorClamp extends ScriptC {
    private static final String __rs_resource_name = "colorclamp";
    // Constructor
    public  ScriptC_ColorClamp(RenderScript rs) {
        this(rs,
             rs.getApplicationContext().getResources(),
             rs.getApplicationContext().getResources().getIdentifier(
                 __rs_resource_name, "raw",
                 rs.getApplicationContext().getPackageName()));
    }

    public  ScriptC_ColorClamp(RenderScript rs, Resources resources, int id) {
        super(rs, resources, id);
        __F32_4 = Element.F32_4(rs);
        __U8_4 = Element.U8_4(rs);
    }

    private Element __F32_4;
    private Element __U8_4;
    private FieldPacker __rs_fp_F32_4;
    private final static int mExportVarIdx_minVector = 0;
    private Float4 mExportVar_minVector;
    public synchronized void set_minVector(Float4 v) {
        mExportVar_minVector = v;
        FieldPacker fp = new FieldPacker(16);
        fp.addF32(v);
        int []__dimArr = new int[1];
        __dimArr[0] = 1;
        setVar(mExportVarIdx_minVector, fp, __F32_4, __dimArr);
    }

    public Float4 get_minVector() {
        return mExportVar_minVector;
    }

    public Script.FieldID getFieldID_minVector() {
        return createFieldID(mExportVarIdx_minVector, null);
    }

    private final static int mExportVarIdx_maxVector = 1;
    private Float4 mExportVar_maxVector;
    public synchronized void set_maxVector(Float4 v) {
        mExportVar_maxVector = v;
        FieldPacker fp = new FieldPacker(16);
        fp.addF32(v);
        int []__dimArr = new int[1];
        __dimArr[0] = 1;
        setVar(mExportVarIdx_maxVector, fp, __F32_4, __dimArr);
    }

    public Float4 get_maxVector() {
        return mExportVar_maxVector;
    }

    public Script.FieldID getFieldID_maxVector() {
        return createFieldID(mExportVarIdx_maxVector, null);
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
        if (!ain.getType().getElement().isCompatible(__U8_4)) {
            throw new RSRuntimeException("Type mismatch with U8_4!");
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

