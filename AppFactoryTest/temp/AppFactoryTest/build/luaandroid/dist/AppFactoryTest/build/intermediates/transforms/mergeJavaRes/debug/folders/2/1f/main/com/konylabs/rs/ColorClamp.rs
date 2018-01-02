#pragma version(1)
#pragma rs java_package_name(com.konylabs.rs)

float4 minVector;
float4 maxVector;

void root(const uchar4 *v_in, uchar4 *v_out) {
    float4 inPix = rsUnpackColor8888(*v_in);
    float4 outPix = clamp(inPix, minVector, maxVector);
    *v_out = rsPackColorTo8888(outPix);
}