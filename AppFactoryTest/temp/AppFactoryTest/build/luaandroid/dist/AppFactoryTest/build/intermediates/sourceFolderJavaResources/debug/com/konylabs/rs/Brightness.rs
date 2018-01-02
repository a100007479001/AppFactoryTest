#pragma version(1)
#pragma rs java_package_name(com.konylabs.rs)

float fraction;

void root(const uchar4 *v_in, uchar4 *v_out) {
    float4 inPix = rsUnpackColor8888(*v_in);
    float a = inPix.a;
    float r = inPix.r * fraction;
    float g = inPix.g * fraction;
    float b = inPix.b * fraction;
    *v_out = rsPackColorTo8888(r,g,b,a);
}